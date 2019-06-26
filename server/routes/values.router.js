const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// GET list of all the values

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM value ORDER BY RANDOM();`;
    pool.query(queryText)
    .then((results) => {
        console.log('get values results.row:', results.rows);
        res.send(results.rows)
    }).catch(error => {
        console.log('Error in GET values:', error);
        res.sendStatus(500);
    });
})

router.get('/category', rejectUnauthenticated, (req, res) => {
	let queryText = `SELECT * FROM "category";`;
	pool.query(queryText)
	.then((result) => {
		console.log('category GET results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in category GET:', error)
	});
})

module.exports = router;
