const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// GET list all admins
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.user.level >= 4) {
		let queryText = `SELECT "admin"."id", concat("first_name", ' ', "last_name") AS "name", "organization", "title", "email_address", "phone_number", concat("street_address", ' ', "street_address2", ' ', "city", ' ', "state", ' ', "zipcode") as "address", "state", "level" FROM "admin_contact"
		JOIN "admin" ON "admin_contact"."admin_id" = "admin"."id";`;
    	pool.query(queryText)
    		.then((results) => {
        	res.send(results.rows)
			}).catch((error) => {
				console.log('error in all participants GET:', error)
			});
	} else {
		console.log('unauthorized all admins GET')
		res.sendStatus(403);
	}
})

module.exports = router; 