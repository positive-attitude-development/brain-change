const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//GET route for all of an owner/admin's participants
router.get('/', rejectUnauthenticated, (req, res) => {
	//console.log('profile req.user:', req.user.id)
	let queryText = `SELECT "participant"."id" as "participant_id", concat("participant"."first_name", ' ', "participant"."last_name") AS "participant_name", "admin_id", "age", "gender", (select "category"."category" FROM "category" WHERE "category".id = "participant"."category_id"), "state", "email", "phone_number" AS "phone", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id FROM "participant"
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
	let queryText = `SELECT "participant"."id", "first_name", "last_name", "participant"."admin_id", "age", "gender", "category_id", "state", "email", "phone_number", "offender".id AS offenderid, "offender".system_id, "offender".offender_system_id, "offender".felon, "offender".violent_offender, "offender".population_id, "offender_population".population, "offender_system"."system","url".id as urlId, "url".url, "url".expiration_date FROM "participant"
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


//POST route to add new participants
router.post('/', rejectUnauthenticated, async (req, res, next) => {
  console.log('add participant req.body:', req.body);
  console.log('add participant req.body.participant:', req.body.participant);
  console.log('add participant req.body.offender:', req.body.offender);
  const isOffender = (req.body.participant.category_id === 1);
  console.log('participant is offender:', isOffender);
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const addParticipant = `INSERT INTO "participant" ("first_name", "last_name", "admin_id", "age", "gender", "category_id", "state", "email", "phone_number")
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id;`;
    const addParticipantValues = [req.body.participant.first_name, req.body.participant.last_name, req.user.id, req.body.participant.age, req.body.participant.gender, req.body.participant.category_id, req.body.participant.state, req.body.participant.email_address, req.body.participant.phone_number];
    const result = await connection.query(addParticipant, addParticipantValues)
    //save the id of the participant we're creating to use in next insert
    const participantId = result.rows[0].id;
	//query database for today's date + 30 days as "newdate" and assign newdate to const expirationDate
	const getExpirationDate = await connection.query(`SELECT current_date + integer '30' as newdate;`)
	const expirationDate = getExpirationDate.rows[0].newdate;
	console.log('expiration date:', expirationDate)
	const participantURL = `INSERT INTO "url" ("url", "expiration_date", "participant_id", "admin_id") VALUES ($1, $2, $3, $4);`;
	const participantURLValues = [req.body.participant.url, expirationDate, participantId, req.user.id ]
	const urlresult = await connection.query(participantURL, participantURLValues)
	
	if (isOffender) {
	  const addParticipantOffender = `INSERT INTO "offender" ("participant_id", "offender_system_id", "system_id", "violent_offender", "felon", "population_id")
        VALUES ($1, $2, $3, $4, $5, $6);`;
      const participantOffenderValues = [participantId, req.body.offender.offender_system_id, req.body.offender.system_id, req.body.offender.violent_offender, req.body.offender.felon, req.body.offender.population_id]
      await connection.query(addParticipantOffender, participantOffenderValues);
	}

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

//POST route for self-registering participants
router.post('/self-register', (req, res) => {
	console.log('add participant req.body:', req.body);
	const addParticipant = `INSERT INTO "participant" ("admin_id", "first_name", "last_name", "age", "gender", "category_id", "state", "email", "phone_number")
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING "id";`;
	const addParticipantValues = [req.body.admin_id, req.body.first_name, req.body.last_name, req.body.age, req.body.gender, req.body.category_id, req.body.state, req.body.email_address, req.body.phone_number];
	pool.query(addParticipant, addParticipantValues)
		.then(result => {
			console.log('Participant self registered')
			res.send({participant_id: result.rows[0].id});
		}).catch(error => {
			console.log(error);
			res.sendStatus(500);
		})
});


//GET route for all participants (owner only)
router.get('/all', rejectUnauthenticated, (req, res) => {
	console.log('req.user:', req.user.id)
	//only owners (access level 3 can get results)
	if (req.user.level >= 4) {

		let queryText = `SELECT "participant"."id" AS "participant_id", concat("participant"."first_name", ' ', "participant"."last_name") AS "participant_name", "participant"."age", "participant"."gender", (select "category"."category" FROM "category" WHERE "category".id = "participant"."category_id"), "participant"."state", "participant"."email", "participant"."phone_number" AS "phone", concat("admin_contact"."first_name", ' ', "admin_contact"."last_name") AS "admin_name" 

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

//updates participant info
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log('update participant req.body:', req.body);
  const isOffender = (req.body.category_id === 1);
  console.log('participant is offender:', isOffender);
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const updateParticipant = `UPDATE "participant" 
	  SET first_name = $1, last_name = $2, age = $3, gender = $4, category_id = $5, state = $6, email = $7, phone_number = $8
      WHERE "participant".id = $9;`;
    const updateParticipantValues = [req.body.first_name, req.body.last_name, req.body.age, req.body.gender, req.body.category_id, req.body.state, req.body.email, req.body.phone_number, req.body.id]
    await connection.query(updateParticipant, updateParticipantValues)
	if(isOffender === 'Offender'){
	  const updateOffender = `UPDATE "offender"
      SET offender_system_id = $1, system_id = $2, violent_offender = $3, felon = $4, population_id = $5
      WHERE participant_id = $6;`;
    const updateOffenderValues = [req.body.offender_system_id, req.body. system_id, req.body.violent_offender, req.body.felon, req.body.population_id, req.body.id]
    await connection.query(updateOffender, updateOffenderValues);
  	}
    await connection.query('COMMIT');
    res.sendStatus(200);
  }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back participant update:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});//end participant update PUT

router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
	let query = `UPDATE "participant" SET "admin_id" = 1 WHERE "participant".id = $1 AND "admin_id" = $2`;
	let values = [req.params.id, req.user.id];
	pool.query(query, values).then(result => {
		console.log('result of participant delete', result);
		res.sendStatus(200);
	}).catch(error => {
		console.log('error in delete participant', error);
		res.sendStatus(500);
	})
})


module.exports = router;
