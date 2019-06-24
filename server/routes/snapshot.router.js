const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
