const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST results
router.post('/result', async (req, res) => {
    console.log('Post result req.body:', req.body);
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        let userResult = req.body;

        // Post to result table
        const addResult = `INSERT INTO result ("dates", "participant_id", "percent_core", "percent_violators")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";`;
        const addResultValues = [userResult.dates, userResult.participantId, userResult.percent_core, userResult.percent_violators];
        const result = await connection.query(addResult, addResultValues);

        //Save result id and post into other tables
        const resultId = result.rows[0].id;

        // Created variables to assign belief request
        let belief1 = req.body.belief1;
        let belief2 = req.body.belief2;
        let belief3 = req.body.belief3;

        // Post to result_belief table
        const addBelief1 = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                            VALUES ($1, $2, $3, $4);`;
        const addBelief2 = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                            VALUES ($1, $2, $3, $4);`;
        const addBelief3 = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                            VALUES ($1, $2, $3, $4);`;
        const beliefValues1 = [resultId, belief1, userResult.challenged1, userResult.type1];
        const beliefValues2 = [resultId, belief2, userResult.challenged2, userResult.type2];
        const beliefValues3 = [resultId, belief3, userResult.challenged3, userResult.type3];

        await connection.query(addBelief1, beliefValues1);
        await connection.query(addBelief2, beliefValues2);
        await connection.query(addBelief3, beliefValues3);        

        // Post core values results to result_core table
        const addCore1 = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3);`;
        const addCore2 = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3);`;
        const addCore3 = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3);`;
        const addCore4 = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3);`;
        const addCore5 = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3);`;
        const addCoreValues1 = [resultId, userResult.coreValue1, userResult.ranks1];
        const addCoreValues2 = [resultId, userResult.coreValue2, userResult.ranks2];
        const addCoreValues3 = [resultId, userResult.coreValue3, userResult.ranks3];
        const addCoreValues4 = [resultId, userResult.coreValue4, userResult.ranks4];
        const addCoreValues5 = [resultId, userResult.coreValue5, userResult.ranks5];

        await connection.query(addCore1, addCoreValues1);
        await connection.query(addCore2, addCoreValues2);
        await connection.query(addCore3, addCoreValues3);
        await connection.query(addCore4, addCoreValues4);
        await connection.query(addCore5, addCoreValues5);

        // Post all eliminated values in order to result_elimination table
        const addElimination1 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination2 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination3 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination4 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination5 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination6 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination7 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination8 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination9 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination10 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination11 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination12 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination13 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination14 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination15 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination16 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination17 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination18 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination19 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination20 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination21 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination22 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination23 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination24 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination25 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination26 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination27 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination28 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination29 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination30 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination31 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination32 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addElimination33 = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
                                
        const addEliminationValues1 = [resultId, userResult.elim1, userResult.order1];
        const addEliminationValues2 = [resultId, userResult.elim2, userResult.order2];
        const addEliminationValues3 = [resultId, userResult.elim3, userResult.order3];
        const addEliminationValues4 = [resultId, userResult.elim4, userResult.order4];
        const addEliminationValues5 = [resultId, userResult.elim5, userResult.order5];
        const addEliminationValues6 = [resultId, userResult.elim6, userResult.order6];
        const addEliminationValues7 = [resultId, userResult.elim7, userResult.order7];
        const addEliminationValues8 = [resultId, userResult.elim8, userResult.order8];
        const addEliminationValues9 = [resultId, userResult.elim9, userResult.order9];
        const addEliminationValues10 = [resultId, userResult.elim10, userResult.order10];
        const addEliminationValues11 = [resultId, userResult.elim11, userResult.order11];
        const addEliminationValues12 = [resultId, userResult.elim12, userResult.order12];
        const addEliminationValues13 = [resultId, userResult.elim13, userResult.order13];
        const addEliminationValues14 = [resultId, userResult.elim14, userResult.order14];
        const addEliminationValues15 = [resultId, userResult.elim15, userResult.order15];
        const addEliminationValues16 = [resultId, userResult.elim16, userResult.order16];
        const addEliminationValues17 = [resultId, userResult.elim17, userResult.order17];
        const addEliminationValues18 = [resultId, userResult.elim18, userResult.order18];
        const addEliminationValues19 = [resultId, userResult.elim19, userResult.order19];
        const addEliminationValues20 = [resultId, userResult.elim20, userResult.order20];
        const addEliminationValues21 = [resultId, userResult.elim21, userResult.order21];
        const addEliminationValues22 = [resultId, userResult.elim22, userResult.order22];
        const addEliminationValues23 = [resultId, userResult.elim23, userResult.order23];
        const addEliminationValues24 = [resultId, userResult.elim24, userResult.order24];
        const addEliminationValues25 = [resultId, userResult.elim25, userResult.order25];
        const addEliminationValues26 = [resultId, userResult.elim26, userResult.order26];
        const addEliminationValues27 = [resultId, userResult.elim27, userResult.order27];
        const addEliminationValues28 = [resultId, userResult.elim28, userResult.order28];
        const addEliminationValues29 = [resultId, userResult.elim29, userResult.order29];
        const addEliminationValues30 = [resultId, userResult.elim30, userResult.order30];
        const addEliminationValues31 = [resultId, userResult.elim31, userResult.order31];
        const addEliminationValues32 = [resultId, userResult.elim32, userResult.order32];
        const addEliminationValues33 = [resultId, userResult.elim33, userResult.order33];

        await connection.query(addElimination1, addEliminationValues1);
        await connection.query(addElimination2, addEliminationValues2);
        await connection.query(addElimination3, addEliminationValues3);
        await connection.query(addElimination4, addEliminationValues4);
        await connection.query(addElimination5, addEliminationValues5);
        await connection.query(addElimination6, addEliminationValues6);
        await connection.query(addElimination7, addEliminationValues7);
        await connection.query(addElimination8, addEliminationValues8);
        await connection.query(addElimination9, addEliminationValues9);
        await connection.query(addElimination10, addEliminationValues10);
        await connection.query(addElimination11, addEliminationValues11);
        await connection.query(addElimination12, addEliminationValues12);
        await connection.query(addElimination13, addEliminationValues13);
        await connection.query(addElimination14, addEliminationValues14);
        await connection.query(addElimination15, addEliminationValues15);
        await connection.query(addElimination16, addEliminationValues16);
        await connection.query(addElimination17, addEliminationValues17);
        await connection.query(addElimination18, addEliminationValues18);
        await connection.query(addElimination19, addEliminationValues19);
        await connection.query(addElimination20, addEliminationValues20);
        await connection.query(addElimination21, addEliminationValues21);
        await connection.query(addElimination22, addEliminationValues22);
        await connection.query(addElimination23, addEliminationValues23);
        await connection.query(addElimination24, addEliminationValues24);
        await connection.query(addElimination25, addEliminationValues25);
        await connection.query(addElimination26, addEliminationValues26);
        await connection.query(addElimination27, addEliminationValues27);
        await connection.query(addElimination28, addEliminationValues28);
        await connection.query(addElimination29, addEliminationValues29);
        await connection.query(addElimination30, addEliminationValues30);
        await connection.query(addElimination31, addEliminationValues31);
        await connection.query(addElimination32, addEliminationValues32);
        await connection.query(addElimination33, addEliminationValues33);

        // Post time by seconds for each round of the exercise to result_round table
        const addRound1 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound2 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound3 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound4 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound5 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound6 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound7 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound8 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound9 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound10 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRound11 = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3);`;
        const addRoundValues1 = [resultId, userResult.eliminationRound1, userResult.time1];
        const addRoundValues2 = [resultId, userResult.eliminationRound2, userResult.time2];
        const addRoundValues3 = [resultId, userResult.eliminationRound3, userResult.time3];
        const addRoundValues4 = [resultId, userResult.eliminationRound4, userResult.time4];
        const addRoundValues5 = [resultId, userResult.eliminationRound5, userResult.time5];
        const addRoundValues6 = [resultId, userResult.eliminationRound6, userResult.time6];
        const addRoundValues7 = [resultId, userResult.eliminationRound7, userResult.time7];
        const addRoundValues8 = [resultId, userResult.eliminationRound8, userResult.time8];
        const addRoundValues9 = [resultId, userResult.eliminationRound9, userResult.time9];
        const addRoundValues10 = [resultId, userResult.eliminationRound10, userResult.time10];
        const addRoundValues11 = [resultId, userResult.eliminationRound11, userResult.time11];

        await connection.query(addRound1, addRoundValues1);
        await connection.query(addRound2, addRoundValues2);
        await connection.query(addRound3, addRoundValues3);
        await connection.query(addRound4, addRoundValues4);
        await connection.query(addRound5, addRoundValues5);
        await connection.query(addRound6, addRoundValues6);
        await connection.query(addRound7, addRoundValues7);
        await connection.query(addRound8, addRoundValues8);
        await connection.query(addRound9, addRoundValues9);
        await connection.query(addRound10, addRoundValues10);
        await connection.query(addRound11, addRoundValues11);

        // Post violator values in order to result_violators table.
        const addViolator1 = `INSERT INTO result_violators ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addViolator2 = `INSERT INTO result_violators ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addViolator3 = `INSERT INTO result_violators ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addViolator4 = `INSERT INTO result_violators ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addViolator5 = `INSERT INTO result_violators ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3);`;
        const addViolatorValues1 = [resultId, userResult.violator1, userResult.orderViolator1];
        const addViolatorValues2 = [resultId, userResult.violator2, userResult.orderViolator2];
        const addViolatorValues3 = [resultId, userResult.violator3, userResult.orderViolator3];
        const addViolatorValues4 = [resultId, userResult.violator4, userResult.orderViolator4];
        const addViolatorValues5 = [resultId, userResult.violator5, userResult.orderViolator5];

        await connection.query(addViolator1, addViolatorValues1);
        await connection.query(addViolator2, addViolatorValues2);
        await connection.query(addViolator3, addViolatorValues3);
        await connection.query(addViolator4, addViolatorValues4);
        await connection.query(addViolator5, addViolatorValues5);

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

    let queryText = `SELECT
    "participant".id, "participant".age, "participant".gender, "participant".state,
    (select "category".category AS "category" FROM "category" WHERE "category".id = "participant".category_id),
    (select "offender_system".system AS "system" FROM "offender_system" WHERE "offender_system".id = "offender".offender_system_id),
    (select "offender_population".population AS "population" FROM "offender_population" WHERE "offender_population".id = "offender".population_id),
    "offender".felon, "offender".violent_offender,
    "result".id AS "result_id", "result".dates AS "date", "result".percent_core AS "%_core", "result".percent_violators AS "%_violators",

    (select array_agg("result_belief".belief) AS "beliefs" FROM "result_belief" WHERE "result_belief".result_id = "result".id),

    (select array_agg("result_belief".challenged) AS "challenged" FROM "result_belief" WHERE "result_belief".result_id = "result".id),
    (select array_agg("result_belief".type) AS "belief_type" FROM "result_belief" WHERE "result_belief".result_id = "result".id),
    (select array_agg("value".values ORDER BY "result_core".ranks) AS "core_values" FROM "result_core" JOIN "value" ON "result_core".value_id = "value".id WHERE "result_core".result_id = "result".id),
    (select array_agg("value".values ORDER BY "result_violators".order) AS "violators" FROM "result_violators" JOIN "value" ON "result_violators".value_id = "value".id WHERE "result_violators".result_id = "result".id),
    (select array_agg("value".values ORDER BY "result_elimination".order) AS "elimination_order" FROM "result_elimination" JOIN "value" ON "result_elimination".value_id = "value".id WHERE "result_elimination".result_id = "result".id),
    (select array_agg("result_round".times) AS "seconds_per_round" FROM "result_round" WHERE "result_round".result_id = "result".id)

    FROM "participant"
    FULL JOIN "offender" ON "offender".participant_id = "participant".id
    JOIN "result" ON "result".participant_id = "participant".id

    GROUP BY "participant".id, "offender".id, "result".id
    ORDER BY "result_id" ASC;`;

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
