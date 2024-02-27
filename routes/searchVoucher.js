const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db');
const e = require('express');

router.get('/', async (req, res) => {
    console.log("SearchVoucher request received");
    console.log("userid = " + req.query.userid);
    console.log("isAdmin = " + req.query.isAdmin);
    console.log("voucher = " + req.query.voucher);


    var options = "";
    if (req.query.userid) {
            options = " where UserID = " + req.query.userid + " ";        
    }
    console.log("options after company = " + options);

    if (req.query.voucher) {
        if (options) {
            options += " and voucher in (" + req.query.voucher + ")";
        }
        else {
            options += " where voucher in (" + req.query.voucher + ")";
        }
        
    }

    var isTrueSet = (req.query.isAdmin);
    console.log("isTrueSet = " + isTrueSet);

    var fields = " id, CONVERT(varchar,datePar,103) datePar,number,customerName,customerPhone,customerMobile,customerEmail,simpleDelivery,antikatavoli,deliverySuturday,deliveryPivkup,case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher,commission,costPayOnDelivary,trasportationCost,weight,netprice,vat,total,extraVouchers, voucherReturn,companyName,weight,courierReceived,parcelReturned,deliveredToCustomer ";//CONVERT(varchar,datePar,103)
    if (isTrueSet) {
        fields = " id, CONVERT(varchar,datePar,103) datePar, timePar,  number , customerName, customerAddress, customerCity, customerZip, customerPhone, customerMobile, customerEmail, userid, companyName, simpleDelivery, antikatavoli, deliverySuturday, deliveryPivkup,case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher, voucherReturn, notes, notesForCourier, userId, commission, trasportationCost, costPayOnDelivary, weight, netPrice, vat, total, courierReceived, parcels, extraVouchers, CONVERT(varchar,courierReceivedDate,103) courierReceivedDate, customerGotPayed, CONVERT(varchar,customerGotPayedDate,103) customerGotPayedDate, courierPayed, CONVERT(varchar,courierPayedDate,103) courierPayedDate, parcelReturned, CONVERT(varchar,parcelReturnedDate,103) parcelReturnedDate, deliveredToCustomer, CONVERT(varchar,deliveredToCustomerDate,103) deliveredToCustomerDate, courierPayedAmount, lockWithDiference, lockWithDiferenceDate ";
        options = " Where voucher in (" + req.query.voucher + ")";
    }        
    
    //console.log("IsPayedFromCourier = " + ReturnVoucher + " typeof " + typeof (ReturnVoucher));

    var queryStr = "SELECT " + fields + " FROM [dbo].[sales]" + options;
    console.log("<<< " + queryStr + " >>>");

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(queryStr)

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});



module.exports = router