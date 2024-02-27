const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log("Update Return Voucher");

    var date = req.query.date;
    var startDate = req.query.startDate;
    var voucher = req.query.voucher;
    var originalVoucher = req.query.originalVoucher;

    console.log("Voucher = " + voucher);
    console.log("Original Voucher = " + originalVoucher);
    console.log("date" + date);
    console.log("startDate" + startDate);

    var hasError = false;
    var queryStr = "update sales set deliveredToCustomer = 1, deliveredToCustomerDate = '" + date + "',courierReceivedDate = '" + startDate + "' where voucher in (" + voucher + "); update sales set deliveredToCustomer = 1, deliveredToCustomerDate = '" + date + "' where voucher in (" + originalVoucher + ");";

    if (!hasError) {

        console.log("query = '" + queryStr + "'");

        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queryStr)

            //res.json(result.recordset)
            res.status(201)
            res.send()
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    }
    else {
        res.status(500);
    }

})

module.exports = router