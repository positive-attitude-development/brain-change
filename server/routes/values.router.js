const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// GET list of all the values

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM value ORDER BY RANDOM();`;
    pool.query(queryText)
    .then((results) => {
        res.send(results.rows)
    }).catch(error => {
        console.log('Error in GET values:', error);
        res.sendStatus(500);
    });
})

router.get('/category', rejectUnauthenticated, (req, res) => {
	let queryText = `SELECT * FROM "category" ORDER BY "category"."id";`;
	pool.query(queryText)
	.then((result) => {
		console.log('category GET results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in category GET:', error)
	});
})

router.get('/population', rejectUnauthenticated, (req, res) => {
	let queryText = `SELECT * FROM "offender_population" ORDER BY "offender_population"."id";`;
	pool.query(queryText)
	.then((result) => {
		console.log('population GET results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in population GET:', error)
	});
})

router.get('/system', rejectUnauthenticated, (req, res) => {
	let queryText = `SELECT * FROM "offender_system" ORDER BY "offender_system"."id";`;
	pool.query(queryText)
	.then((result) => {
		console.log('system GET results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in system GET:', error)
	});
})

module.exports = router;
