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

module.exports = router;