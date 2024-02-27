const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log('request salesNewNumber received!');
    var series = req.query.series;
    console.log("number= " + series);

    var queryStr = "select ISNULL(MAX(number),0) + 1 number from sales where series = '" + series + "'";
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