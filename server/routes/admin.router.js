const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for admin information if admin is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/profile', rejectUnauthenticated, (req, res) => {
	console.log('profile req.user:', req.user.id)
	let queryText = `SELECT * FROM "admin"
		JOIN "admin_contact" ON "admin_contact".admin_id = "admin".id
		WHERE "admin".id = $1 
		ORDER BY "admin".id;`;
		let queryValue = req.user.id
	pool.query(queryText, [queryValue])
	.then((result) => {
		console.log('admin profile get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in admin profile GET:', error)
	});
})


router.post('/register', async (req, res, next) => {
  console.log('register admin req.body:', req.body)
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const addAdmin = 'INSERT INTO "admin" (username, password) VALUES ($1, $2) RETURNING id'; 
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const result = await connection.query(addAdmin, [username, password])
    //save the id of the admin we're creating to use in next insert
    const adminId = result.rows[0].id;
    const addAdminContact = `INSERT INTO "admin_contact" ("admin_id", "first_name", "last_name", "title", "organization", "phone_number", "email_address", "street_address", "street_address2", "city", "state", "zipcode")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;
    const contactValues = [adminId, req.body.firstName, req.body.lastName, req.body.title, req.body.organization, req.body.phoneNumber, req.body.emailAddress, req.body.streetAddress, req.body.streetAddressTwo, req.body.city, req.body.state, req.body.zipcode]
    await connection.query(addAdminContact, contactValues);
    await connection.query('COMMIT');
    res.sendStatus(200);
  }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back admin entry:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful or send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('login req.user:', req.user)
  res.json(req.user);
});

// clear all server session information about this admin
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the admin
  req.logout();
  res.sendStatus(200);
});

router.put('/level', (req, res) => {
  console.log('here is req.body', req.body);
  let queryText = `UPDATE "admin" SET "level" = $1 WHERE id = $2;`;
  let queryValues = [req.body.level, req.body.id];
  pool.query(queryText, queryValues)
    .then((results) => {
      console.log('access level updated');
      res.sendStatus(200);
    }).catch(error => {
      console.log('Error in PUT access level:', error);
      res.sendStatus(500);
    });
});

//updates admin/owner profile info
router.put('/profile/:id', rejectUnauthenticated, async (req, res) => {
	console.log('req.body:', req.body)
  const connection = await pool.connect()
  try{
    await connection.query('BEGIN');
    const updateProfile = `UPDATE "admin" SET username = $1
      WHERE "admin".id = $2;`;
    const updateProfileValues = [req.body.username, req.user.id]
    await connection.query(updateProfile, updateProfileValues)
    const updateProfileContact = `UPDATE "admin_contact"
      SET first_name = $1, last_name = $2, title = $3, organization = $4, email_address = $5, phone_number = $6,
      street_address = $7, street_address2 = $8, city = $9, state = $10, zipcode = $11
      WHERE admin_id = $12;`;
    const updateContactValues = [req.body.first_name, req.body.last_name, req.body.title, req.body.organization, req.body.email_address, req.body.phone_number, req.body.street_address, req.body.street_address2, req.body.city, req.body.state, req.body.zipcode, req.user.id]
    await connection.query(updateProfileContact, updateContactValues);
    await connection.query('COMMIT');
    res.sendStatus(200);
  }catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back admin profile update:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});//end profile update PUT

module.exports = router;
