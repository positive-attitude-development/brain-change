const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//GET route for all of an owner/admin's participants
router.get('/', rejectUnauthenticated, (req, res) => {
	console.log('profile req.user:', req.user.id)
	let queryText = `SELECT "participant"."id", "first_name", "last_name", "admin_id", "age", "gender", "category", "state", "email", "phone_number", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id FROM "participant"
		FULL JOIN "offender" ON "participant".id = "offender".participant_id
		WHERE "participant".admin_id = $1
		ORDER BY "participant".id;`;
		let queryValue = req.user.id
	pool.query(queryText, [queryValue])
	.then((result) => {
		console.log('admin profile get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in admin profile GET:', error)
	});
})

//GET route for an individual participant's info
router.get('/individual/:id', rejectUnauthenticated, (req, res) => {
	console.log('individual query params', req.params.id)
	let queryText = `SELECT "participant"."id", "first_name", "last_name", "admin_id", "age", "gender", "category", "state", "email", "phone_number", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id FROM "participant"
		FULL JOIN "offender" ON "participant".id = "offender".participant_id
		WHERE "participant".admin_id = $1
		AND "participant".id = $2;`;
		let queryValues = [req.user.id, req.params.id]
	pool.query(queryText, queryValues)
	.then((result) => {
		console.log('admin profile get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in admin profile GET:', error)
	});
})

//GET route for all participants (owner only)
router.get('/all', rejectUnauthenticated, (req, res) => {
	console.log('req.user:', req.user.id)
	//only owners (access level 3 can get results)
	if (req.user.access_level === 3) {
		let queryText = `SELECT "participant"."id", concat("participant"."first_name", ' ', "participant"."last_name") AS "participant_name", "participant"."age", "participant"."gender", "participant"."category", "participant"."state", "participant"."email", "participant"."phone_number", concat("admin_contact"."first_name", ' ', "admin_contact"."last_name") AS "admin_name" 
		FROM "participant" JOIN "admin_contact" ON "participant".id = "admin_contact".id
		ORDER BY "participant".id;`;
		pool.query(queryText)
			.then((result) => {
				console.log('all participants GET results:', result.rows);
				res.send(result.rows)
			}).catch((error) => {
				console.log('error in all participants GET:', error)
			});
	} else {
		console.log('unauthorized all participants GET')
		res.sendStatus(403);
	}
})

module.exports = router;
