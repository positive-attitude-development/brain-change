const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

//POST results
router.post('/result', async (req, res) => {
    console.log('Post result req.body:', req.body);
    const connection = await pool.connect();
    let currentDate = moment().format('MM-DD-YYYY');
    try {
        await connection.query('BEGIN');

        //Post to result table
        const addResult = `INSERT INTO result ("dates", "participant_id", "percent_core", "percent_violators")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";`;
        const addResultValues = [currentDate, req.body.participantId, req.body.percents.valuesPercent, req.body.percents.violatorPercent];
        const result = await connection.query(addResult, addResultValues);

        //Save result id and post into other tables
        const resultId = result.rows[0].id;

        // Created variables to assign belief request
        let challenged1 = false;
        let type1 = '';
        let challenged2 = false;
        let type2 = '';
        let challenged3 = false;
        let type3 = '';
        if(req.body.beliefs.belief1 === req.body.testedBelief.testedBelief){
            challenged1 = true;
            type1 = req.body.testedBelief.typeOfBelief;
        }else if(req.body.beliefs.belief2 === req.body.testedBelief.testedBelief){
            challenged3 = true;
            type1 = req.body.testedBelief.typeOfBelief;
        }else if(req.body.beliefs.belief3 === req.body.testedBelief.testedBelief){
            challenged3 = true;
            type3 = req.body.testedBelief.typeOfBelief;
        }
        // Post to result_belief table
        const addBeliefs = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                            VALUES ($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12);`;
        const beliefValues = [resultId, req.body.beliefs.belief1, challenged1, type1,
                            resultId, req.body.beliefs.belief2, challenged2, type2,
                            resultId, req.body.beliefs.belief3, challenged3, type3];

        await connection.query(addBeliefs, beliefValues);     

         // Post core values results to result_core table
        const addCore = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15);`;
        const addCoreValues = [resultId, req.body.orderCore[0], 1, resultId, req.body.orderCore[1], 2,
            resultId, req.body.orderCore[2], 3, resultId, req.body.orderCore[3], 4, resultId, req.body.orderCore[4], 5];

        await connection.query(addCore, addCoreValues);
 
         // Post all eliminated values in order to result_elimination table
        const addElimination = `INSERT INTO result_elimination ("result_id", "value_id", "order")
            VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15), ($16, $17, $18),
            ($19, $20, $21), ($22, $23, $24), ($25, $26, $27), ($28, $29, $30), ($31, $32, $33), ($34, $35, $36), 
            ($37, $38, $39), ($40, $41, $42), ($43, $44, $45), ($46, $47, $48), ($49, $50, $51), ($52, $53, $54), 
            ($55, $56, $57), ($58, $59, $60), ($61, $62, $63), ($64, $65, $66), ($67, $68, $69), ($70, $71, $72), 
            ($73, $74, $75), ($76, $77, $78), ($79, $80, $81), ($82, $83, $84), ($85, $86, $87), ($88, $89, $90), 
            ($91, $92, $93), ($94, $95, $96), ($97, $98, $99);`;
                                
         const addEliminationValues = [resultId, req.body.round1[0], 1, resultId, req.body.round1[1], 2,
            resultId, req.body.round1[2], 3, resultId, req.body.round1[3], 4, resultId, req.body.round1[4], 5,
            resultId, req.body.round1[5], 6, resultId, req.body.round1[6], 7, resultId, req.body.round1[7], 8,
            resultId, req.body.round1[8], 9, resultId, req.body.round2[0], 10, resultId, req.body.round2[1], 11,
            resultId, req.body.round2[2], 12, resultId, req.body.round2[3], 13, resultId, req.body.round2[4], 14,
            resultId, req.body.round2[5], 15, resultId, req.body.round2[6], 16, resultId, req.body.round2[7], 17,
            resultId, req.body.round2[8], 18, resultId, req.body.round3[0], 19, resultId, req.body.round3[1], 20,
            resultId, req.body.round3[2], 21, resultId, req.body.round3[3], 22, resultId, req.body.round3[4], 23,
            resultId, req.body.round4[0], 24, resultId, req.body.round4[1], 25, resultId, req.body.round4[2], 26, 
            resultId, req.body.round4[3], 27, resultId, req.body.round4[4], 28, resultId, req.body.round5[0], 29, 
            resultId, req.body.round5[1], 30, resultId, req.body.round5[2], 31, resultId, req.body.round5[3], 32, 
            resultId, req.body.round5[4], 33];

        await connection.query(addElimination, addEliminationValues);

         // Post time by seconds for each round of the exercise to result_round table
        const addRounds = `INSERT INTO result_round ("result_id", "elimination_round", "times")
            VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15), 
            ($16, $17, $18), ($19, $20, $21), ($22, $23, $24), ($25, $26, $27), ($28, $29, $30), ($31, $32, $33);`;

        const addRoundValues = [resultId, 1, req.body.round1Time, resultId, 2, req.body.round2Time,
        resultId, 3, req.body.belief1Time, resultId, 4, req.body.round3Time, resultId, 5, req.body.round4Time,
        resultId, 6, req.body.belief2Time, resultId, 7, req.body.round5Time, resultId, 8, req.body.orderCoreTime,
        resultId, 9, req.body.pickViolatorTime, resultId, 10, req.body.orderViolatorTime, resultId, 11, req.body.percentTime];

        await connection.query(addRounds, addRoundValues);

         // Post violator values in order to result_violators table.
        const addViolators = `INSERT INTO result_violators ("result_id", "value_id", "order")
            VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15);`;

        const addViolatorValues = [resultId, req.body.orderViolators[0], 1, resultId, req.body.orderViolators[1], 2,
            resultId, req.body.orderViolators[2], 3, resultId, req.body.orderViolators[3], 4, resultId, req.body.orderViolators[4], 5];

        await connection.query(addViolators, addViolatorValues);

        await connection.query('COMMIT');
        res.json(resultId);
    }catch(error) {
        // If any of the above steps fail, abort the entire transaction
        await connection.query('ROLLBACK');
        console.log('Error in result POST', error);
        res.sendStatus(500);
    }finally {
        connection.release();
    }
})

// GET all participants belonging to admins
router.get('/', (req, res) => {

    let queryText = `SELECT participant, result, result_belief, result_core, result_violators FROM participant
    JOIN result ON participant.id = result.participant_id
    JOIN result_belief ON result.id = result_belief.result_id
    JOIN result_core ON result_core.result_id = result.id
    JOIN result_violators ON result_violators.result_id = result.id;`;

    pool.query(queryText)
    .then((results) => {
        console.log('results.rows:', results.rows);
        res.send(results.rows)
    }).catch(error => {
        console.log('Error in GET snapshots:', error);
        res.sendStatus(500);
    });
});

// GET all participants belonging to admins
router.get('/all', (req, res) => {

    let queryText = `SELECT "participant".id, "participant".age, "participant".gender, "participant".state,

--"category".category,

"offender_system".system, "offender_population".population, "offender".felon, "offender".violent_offender,

"result".dates AS "date", "result".percent_core AS "pct_core", "result".percent_violators AS "pct_viol",

"result_belief".belief, "result_belief".challenged, "result_belief".type,

"result_core".value_id, "result_core".ranks AS "core_order",

"result_elimination".value_id, "result_elimination".order AS "elimination_order",

"result_round".elimination_round, "result_round".times AS "seconds",

"result_violators".value_id, "result_violators".order AS "violators_order"

FROM "participant"
--JOIN "category" ON "category".id = "participant".category
FULL JOIN "offender" ON "offender".participant_id = "participant".id
FULL JOIN "offender_system" ON "offender_system".id = "offender".offender_system_id
FULL JOIN "offender_population" ON "offender_population".id = "offender".population_id
FULL JOIN "result" ON "result".participant_id = "participant".id
FULL JOIN "result_belief" ON "result_belief".result_id = "result".id
FULL JOIN "result_core" ON "result_core".result_id = "result".id
FULL JOIN "result_elimination" ON "result_elimination".result_id = "result".id
FULL JOIN "result_round" ON "result_round".result_id = "result".id
FULL JOIN "result_violators" ON "result_violators".result_id = "result".id
;`;

    pool.query(queryText)
        .then((results) => {
            console.log('results.rows:', results.rows);
            res.send(results.rows)
        }).catch(error => {
            console.log('Error in GET snapshots:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
