const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

    let queryText = `SELECT concat("first_name", ' ', "last_name") AS "name", "organization", "title", "email_address", "phone_number", "level" FROM "admin_contact"
    JOIN "admin" ON "admin_contact"."admin_id" = "admin"."id";`;
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