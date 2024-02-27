const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("sales list request for payment received");
    console.log("companyID = " + req.query.companyID);
    console.log("fromDate = " + req.query.fromDate);
    console.log("toDate = " + req.query.toDate);
    console.log("isAdmin = " + req.query.isAdmin);

    var options = " Where ISNULL(courierReceived,0) = 1 and ISNULL(customerGotPayed,0) = 0";
    if (req.query.companyID) {
        if (req.query.companyID != "-1") {
            options += " and companyID = '" + req.query.companyID + "' and isnull(lockWithDiference,0) = 0  ";
        }
    }

    if (functions.isValidDate(req.query.fromDate)) {
        console.log("fromDate is valid date");
        if (options) {
            options += " and isnull(courierReceivedDate,datepar) >= '" + req.query.fromDate + "'";
        }
    }
    else {
        console.log("fromDate is invalid date");
    }

    if (functions.isValidDate(req.query.toDate)) {
        console.log("toDate is valid date");
        if (options) {
            options += " and isnull(courierReceivedDate,datepar) <= '" + req.query.toDate + "'";
        }
    }
    else {
        console.log("toDate is invalid date");
    }
    console.log("options = '" + options + "'");

    var isTrueSet = (req.query.isAdmin == 'True');
    console.log("isTrueSet = " + isTrueSet);

    var fields = " id, datePar,series,number,customerName,customerPhone,customerMobile,customerEmail,simpleDelivery,antikatavoli,deliverySuturday,deliveryPivkup,voucher,commission,costPayOnDelivary,trasportationCost,weight,netprice,vat,total,extraVouchers,companyName,courierReceivedDate ";
    if (isTrueSet) {
        fields = "*";
    }

    var queryStr = "SELECT " + fields + " FROM [dbo].[sales]" + options;
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