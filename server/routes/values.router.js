const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET list of all the values

router.get('/', (req, res) => {

    let queryText = `SELECT * FROM value;`;

    pool.query(queryText)
    .then((results) => {
        console.log('results.row:', results.rows);
        res.send(results.rows)
    }).catch(error => {
        console.log('Error in GET values:', error);
        res.sendStatus(500);
    });
})

module.exports = router;
