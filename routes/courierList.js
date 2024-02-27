const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log('Get Courier List received!');
    var queryStr = "select * from CourierList Order by id desc";
    console.log(queryStr);

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(queryStr)

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }

})

module.exports = router
