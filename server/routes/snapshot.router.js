const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST results
router.post('/result', async (req, res) => {
    console.log('Post result req.body', req.body);
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        let userResult = req.body;
        const addResult = `INSERT INTO result ("dates", "participant_id", "percent_core", "percent_violators")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";`;
        const addResultValues = [userResult.dates, userResult.participant_id, userResult.percent_core, userResult.percent_violators];
        const result = await connection.query(addResult, addResultValues);

        //Save result id and post into other tables
        const resultId = result.rows[0].id;

        const addBelief = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                            VALUES ($1, $2, $3, $4)`;
        const beliefValues = [resultId, userResult.belief, userResult.challenged, userResult.type];
        await connection.query(addBelief, beliefValues);

        const addCore = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                         VALUES ($1, $2, $3)
                         RETURNING "result_id";`;
        const addCoreValues = [resultId, userResult.value_id, userResult.ranks];
        await connection.query(addCore, addCoreValues);

        const addElimination = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                                VALUES ($1, $2, $3)
                                RETURNING "result_id";`;
        const addEliminationValues = [resultId, userResult.elim_value_id, userResult.order];
        await connection.query(addElimination, addEliminationValues);

        const addRound = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                            VALUES ($1, $2, $3)
                            RETURNING "result_id";`;
        const addRoundValues = [resultId, userResult.elimination_round, userResult.times];
        await connection.query(addRound, addRoundValues);

        const addViolator = `INSERT INTO result_violators (result_id, value_id)
                                VALUES ($1, $2);`;
        const addViolatorValues = [resultId, userResult.value_id];
        await connection.query(addViolator, addViolatorValues);
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

module.exports = router;
