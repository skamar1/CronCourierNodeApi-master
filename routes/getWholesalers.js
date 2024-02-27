const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("get Wholesalers received");

    var queryStr = "select userid,name from users where userid in (select wholesalerid from sales)";
    console.log(queryStr);

    try {
        const pool = await poolPromise
        const result = await pool.request()
            //.input('username', sql.VarChar(30), user)
            .query(queryStr)

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

module.exports = router