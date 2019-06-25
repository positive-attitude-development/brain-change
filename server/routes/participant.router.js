const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();


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


module.exports = router;
