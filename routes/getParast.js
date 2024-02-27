const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("get Parast received");
    console.log("req.params.id = " + req.query.id);
    var id = req.query.id;
    console.log("id = " + id);
    var hasError = false;

    if (!functions.isNumber(req.query.id)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("id is invalide error 400");
        hasError = true;
    }

    var queryStr = "select  id, datePar, timePar, series, number, customerName, customerAddress, customerCity, customerZip, customerPhone, customerMobile, customerEmail, companyID, companyName, simpleDelivery, antikatavoli, deliverySuturday, deliveryPivkup,case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher, voucherReturn, notes, notesForCourier, userId, commission, trasportationCost, costPayOnDelivary, weight, netPrice, vat, total, courierReceived, parcels, extraVouchers, courierReceivedDate, customerGotPayed, customerGotPayedDate, courierPayed, courierPayedDate, parcelReturned, parcelReturnedDate, deliveredToCustomer, deliveredToCustomerDate, courierPayedAmount, lockWithDiference, lockWithDiferenceDate from sales where id = " + id;
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