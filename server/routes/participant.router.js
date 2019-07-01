const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//GET route for all of an owner/admin's participants
router.get('/', rejectUnauthenticated, (req, res) => {
	//console.log('profile req.user:', req.user.id)
	let queryText = `SELECT "participant"."id", "first_name", "last_name", "admin_id", "age", "gender", "category", "state", "email", "phone_number", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id FROM "participant"
		FULL JOIN "offender" ON "participant".id = "offender".participant_id
		WHERE "participant".admin_id = $1
		ORDER BY "participant".id;`;
		let queryValue = req.user.id
	pool.query(queryText, [queryValue])
	.then((result) => {
		console.log('participant get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in participant GET:', error)
	});
})

//GET route for an individual participant's info
router.get('/individual/:id', rejectUnauthenticated, (req, res) => {
	console.log('individual query params', req.params.id)
	let queryText = `SELECT "participant"."id", "first_name", "last_name", "participant"."admin_id", "age", "gender", "category", "state", "email", "phone_number", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id, "offender_population".population, "offender_system"."system","url".id as urlId, "url".url, "url".expiration_date FROM "participant"
		FULL JOIN "offender" ON "participant".id = "offender".participant_id
		FULL JOIN "offender_population" ON "offender_population".id = "offender".population_id
		FULL JOIN "offender_system" ON "offender_system".id = "offender".offender_system_id
		FULL JOIN "url" ON "url".participant_id = "participant".id
		WHERE "participant".admin_id = $1
		AND "participant".id = $2`;
		let queryValues = [req.user.id, req.params.id]
	pool.query(queryText, queryValues)
	.then((result) => {
		console.log('individual participant get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in individual participant GET:', error)
	});
})


//POST route to add new non-offender participant
router.post('/', rejectUnauthenticated, async (req, res, next) => {
  console.log('add participant req.body:', req.body)
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const addParticipant = `INSERT INTO "participant" ("first_name", "last_name", "admin_id", "age", "gender", "category", "state", "email", "phone_number")
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id;`;
    const addParticipantValues = [req.body.first_name, req.body.last_name, req.user.id, req.body.age, req.body.gender, req.body.category, req.body.state, req.body.email_address, req.body.phone_number];
    const result = await connection.query(addParticipant, addParticipantValues)
    //save the id of the participant we're creating to use in next insert
    const participantId = result.rows[0].id;
	//query database for today's date + 30 days as "newdate" and assign newdate to const expirationDate
	const getExpirationDate = await connection.query(`SELECT current_date + integer '30' as newdate;`)
	const expirationDate = getExpirationDate.rows[0].newdate;
	console.log('expiration date:', expirationDate)
	const participantURL = `INSERT INTO "url" ("url", "expiration_date", "participant_id", "admin_id")
		VALUES ($1, $2, $3, $4);`;
	const participantURLValues = [req.body.url, expirationDate, participantId, req.user.id ]
	const urlresult = await connection.query(participantURL, participantURLValues)
    await connection.query('COMMIT');
    res.json(participantId);
  }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back participant entry:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});

//POST route to add new offender participant
router.post('/offender', rejectUnauthenticated, async (req, res, next) => {
  console.log('add offender participant req.body:', req.body)
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const addParticipant = `INSERT INTO "participant" ("first_name", "last_name", "admin_id", "age", "gender", "category", "state", "email", "phone_number")
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id;`;
    const addParticipantValues = [req.body.participant.first_name, req.body.participant.last_name, req.user.id, req.body.participant.age, req.body.participant.gender, req.body.participant.category, req.body.participant.state, req.body.participant.email_address, req.body.participant.phone_number];
    const result = await connection.query(addParticipant, addParticipantValues)
    //save the id of the participant we're creating to use in next insert
    const participantId = result.rows[0].id;
	//query database for today's date + 30 days as "newdate" and assign newdate to const expirationDate
	const getExpirationDate = await connection.query(`SELECT current_date + integer '30' as newdate;`)
	const expirationDate = getExpirationDate.rows[0].newdate;
	const participantURL = `INSERT INTO "url" ("url", "expiration_date", "participant_id", "admin_id")
		VALUES ($1, $2, $3, $4);`;
	const participantURLValues = [req.body.participant.url, expirationDate, participantId, req.user.id ]
	const urlresult = await connection.query(participantURL, participantURLValues)
    const addParticipantOffender = `INSERT INTO "offender" ("participant_id", "offender_system_id", "system_id", "violent_offender", "felon", "population_id")
      VALUES ($1, $2, $3, $4, $5, $6);`;
    const participantOffenderValues = [participantId, req.body.offender.offender_system_id, req.body.offender.system_id, req.body.offender.violent_offender, req.body.offender.felon, req.body.offender.population_id]
    await connection.query(addParticipantOffender, participantOffenderValues);
    await connection.query('COMMIT');
    res.json(participantId);
  }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back participant entry:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});


//GET route for all participants (owner only)
router.get('/all', rejectUnauthenticated, (req, res) => {
	console.log('req.user:', req.user.id)
	//only owners (access level 3 can get results)
	if (req.user.level === 3) {
		let queryText = `SELECT "participant"."id", concat("participant"."first_name", ' ', "participant"."last_name") AS "participant_name", "participant"."age", "participant"."gender", "participant"."category", "participant"."state", "participant"."email", "participant"."phone_number" AS "phone", concat("admin_contact"."first_name", ' ', "admin_contact"."last_name") AS "admin_name" 
		FROM "participant" JOIN "admin_contact" ON "participant"."admin_id" = "admin_contact".id
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
