const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log('update Weight & Cost received!');
    var voucher = req.query.voucher;
    var getDate = req.query.getDate;
    var weight = req.query.weight;
    var acs = req.query.acs;
    var cron = req.query.cron;
    var final = req.query.final;
    console.log("voucher= " + voucher);
    console.log("getDate= " + getDate);
    console.log("weight= " + weight);
    console.log("acs= " + acs);
    console.log("cron= " + cron);
    console.log("final= " + final);

    hasError = false;
    if (voucher === undefined) {
        res.status(400)
        res.send("voucher is required")
        hasError = true;
        return;

    }
    if (getDate === undefined) {
        getDate = null;
    }
    else {
        getDate = "'" + getDate + "'";
    }
    if (weight === undefined) {
        weight = null;
    }
    else {
        weight = "'" + weight + "'";
    }
    if (acs === undefined) {
        acs = 0;
    }
    if (cron === undefined) {
        cron = 0;
    }
    if (final === undefined) {
        final = 0;
    }

    if (!hasError) {

        var queryStr = "update sales set weight = " + weight + ", StartCourierCost = " + acs + ", CronCourierCost = " + cron + ", WholesalerCost = " + final + " where voucher in (" + voucher + ")";
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
    }

})

module.exports = router