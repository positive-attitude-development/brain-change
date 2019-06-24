const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST results
router.post('/result', (req, res) => {
    let result = req.body;
    let queryText = `INSERT INTO result ("dates", "participant_id", "percent_core", "percent_violators")
                    VALUES ($1, $2, $3, $4)
                    RETURNING "id";`;
    pool.query(queryText, [result.dates, result.participant_id, result.percent_core, result.percent_violators])
    .then((result) => {
        console.log('Result Id:', result.rows[0].id);
        let belief = req.body
        let query = `INSERT INTO result_belief ("result_id", "belief", "challenged", "type")
                    VALUES ($1, $2, $3, $4)
                    RETURNING "result_id";`;
        pool.query(query, [result.rows[0].id, belief.belief, belief.challenged, belief.type])
        .then((result) => {
            console.log('Result_id:', result.rows[0].result_id);
            let core = req.body;
            let query = `INSERT INTO result_core ("result_id", "value_id", "ranks")
                        VALUES ($1, $2, $3)
                        RETURNING "result_id";`;
            pool.query(query, [result.rows[0].result_id, core.core_value_id, core.ranks])
            .then((result) => {
                let elimination = req.body;
                let query = `INSERT INTO result_elimination ("result_id", "value_id", "order")
                            VALUES ($1, $2, $3)
                            RETURNING "result_id";`;
                pool.query(query, [result.rows[0].result_id, elimination.elim_value_id, elimination.order])
                .then((result) => {
                    let round = req.body;
                    let query = `INSERT INTO result_round ("result_id", "elimination_round", "times")
                                VALUES ($1, $2, $3)
                                RETURNING "result_id";`;
                    pool.query(query, [result.rows[0].result_id, round.elimination_round, round.times])
                    .then((result) => {
                        let violators = req.body;
                        let query = `INSERT INTO result_violators (result_id, value_id)
                                    VALUES ($1, $2);`;
                        pool.query(query, [result.rows[0].result_id, violators.violator_value_id])
                        .then(result => {
                            res.sendStatus(200);
                        }).catch(error => {
                            console.log('Error in violator POST:', error)
                            res.sendStatus(500);
                        })
                    }).catch(error => {
                        console.log('Error in round POST:', error)
                        res.sendStatus(500);
                    })
                }).catch(error => {
                    console.log('Error in elimination POST:', error)
                    res.sendStatus(500);
                })
            }).catch(error => {
                console.log('Error in core POST:', error)
                res.sendStatus(500);
            })
        }).catch(error => {
            console.log('Error in belief POST:', error)
            res.sendStatus(500);
        })
    }).catch(error => {
        console.log('Error in result POST:', error)
        res.sendStatus(500);
    })
});


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
