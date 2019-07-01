const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//GET route for seeing a participant's most recently generated URL
router.get('/retrieve', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "url" WHERE "participant_id" = $1 ORDER BY "expiration_date" DESC;`;
    pool.query(queryText, [req.query.id])
        .then((result) => {
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('error in url GET:', error);
            res.sendStatus(500);
        });
})

//GET route for checking whether token is valid
router.get('/verify', (req, res) => {
    let queryText = `SELECT "url"."id", "url"."url", "url"."expiration_date", "url"."participant_id", "url"."admin_id", "participant"."first_name" FROM "url" JOIN "participant" ON "participant"."id" = "url"."participant_id" WHERE "url" = $1 ORDER BY "expiration_date" DESC;`;
    pool.query(queryText, [req.query.token])
        .then((result) => {
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('error in url GET:', error);
            res.sendStatus(500);
        });
})

//PUT route for updating expired URL links for participant
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const getExpirationDate = await connection.query(`SELECT current_date + integer '30' as newdate;`)
	const expirationDate = getExpirationDate.rows[0].newdate;
    console.log('post url req.body:', req.body)
	console.log('expiration date:', expirationDate)
    const addUrl = `UPDATE "url" SET url = $1, expiration_date = $2
        WHERE id = $3;`;
    const urlValues = [req.body.url, expirationDate, req.body.urlId];
    const query = await connection.query(addUrl, urlValues)
    await connection.query('COMMIT');
    res.sendStatus(201);
    }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back url post:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}

})

module.exports = router;