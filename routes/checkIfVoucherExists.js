const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.get("/", async function (req, res) {
    console.log("Check if voucher exists received");
    console.log("id = " + req.query.id);
    var id = req.query.id;


    var queryStr = "select src.voucher from (values " + id + ") as src(voucher) WHERE NOT EXISTS (select 1 from sales where sales.voucher = src.voucher)";
    console.log("query = '" + queryStr + "'");

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(queryStr)

        res.status(200)
        res.send(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }


})

module.exports = router