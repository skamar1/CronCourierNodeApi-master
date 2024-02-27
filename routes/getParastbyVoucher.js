const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("get Parast by voucher received");
    console.log("req.params.voucher = " + req.query.voucher);
    var voucher = req.query.voucher;
    console.log("id = " + id);
    var hasError = false;

    if (!functions.isNumber(voucher)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("voucher is invalide error 400");
        hasError = true;
    }

    var queryStr = "select  datePar, timePar, customerName, customerAddress, customerCity, customerZip, customerPhone, companyName, case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher, notesForCourier, total, from sales where voucher = " + voucher;
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