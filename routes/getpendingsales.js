const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("Get Pending sales received");
    console.log("voucher " + req.query.voucher);
    var voucher = req.query.voucher;
    var options = "";
    if (voucher) {
        options = " and voucher = '" + voucher + "'";
    }
    console.log("Options :" + options);

    var queryStr = "select CONVERT(varchar,datepar,23) datepar,CONVERT(varchar,deliveredToCustomerDate,23) deliveredToCustomerDate, CONVERT(varchar,courierReceivedDate,23) courierReceivedDate ,id,voucher,extraVouchers,weight,courierReceived,parcelReturned,deliveredToCustomer,trasportationcost,courierid From [dbo].[sales] where courierid is not null and isnull(deliveredToCustomer,0) = 0 and isnull(parcelReturned,0) = 0 and isnull(courierId,0) >= 3 and ISNULL(deleted,0) = 0 and not voucher like '%-R' or (courierReceivedDate is null and courierReceived = 1 and ISNULL(deleted,0) = 0) " +
        "UNION ALL " +
        "select CONVERT(varchar, datepar, 23) datepar, CONVERT(varchar, deliveredToCustomerDate, 23) deliveredToCustomerDate, CONVERT(varchar, courierReceivedDate, 23) courierReceivedDate, id, voucher, extraVouchers, weight, courierReceived, parcelReturned, deliveredToCustomer, trasportationcost, courierid From[dbo].[sales] where courierid is not null and courierReceived = 1 and courierReceivedDate is null and ISNULL(deleted,0) = 0" +
        "UNION ALL " +
        "select CONVERT(varchar, datepar, 23) datepar, CONVERT(varchar, deliveredToCustomerDate, 23) deliveredToCustomerDate, CONVERT(varchar, courierReceivedDate, 23) courierReceivedDate, id, voucher, extraVouchers, weight, courierReceived, parcelReturned, deliveredToCustomer, trasportationcost, courierid From[dbo].[sales] where courierid is not null and courierReceivedDate is null and payFromStartCourier = 1";
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