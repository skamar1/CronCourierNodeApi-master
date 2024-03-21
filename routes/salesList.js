const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("sales list request received");
    console.log("companyID = " + req.query.companyID);
    console.log("fromDate = " + req.query.fromDate);
    console.log("toDate = " + req.query.toDate);
    console.log("isAdmin = " + req.query.isAdmin);
    console.log("IsPayedFromCourier = " + req.query.IsPayedFromCourier);
    console.log("CourierReceived = " + req.query.CourierReceived);
    console.log("Delivered2Customer = " + req.query.Delivered2Customer);
    console.log("Returns = " + req.query.Returns);
    console.log("ReturnVoucher = " + req.query.ReturnVoucher);
    console.log("datefield = " + req.query.datefield);
    console.log("customerGotPayed = " + req.query.customerGotPayed);
    console.log("wholesalerGotPayed = " + req.query.wholesalerGotPayed);
    console.log("courierGotPayed = " + req.query.courierGotPayed);
    console.log("invoiced = " + req.query.invoiced);
    console.log("wholesalerid = " + req.query.wholesalerid);

    var options = " Where companyid is not null and ISNULL(Deleted,0) = 0 ";// " where courierReceivedDate is not null and ISNULL(customerGotPayed,0) = 0";
    if (req.query.companyID) {
        if (req.query.companyID != "-1") {
            options = " where ISNULL(Deleted,0) = 0 and companyID = '" + req.query.companyID + "'";
        }
    }

    if (functions.isValidDate(req.query.fromDate)) {
        console.log("fromDate is valid date");
        if (options) {
            options += " and " + req.query.datefield + " >= '" + req.query.fromDate + " 00:00'";
        }
    }
    else {
        console.log("fromDate is invalid date");
    }

    if (functions.isValidDate(req.query.toDate)) {
        console.log("toDate is valid date");
        if (options) {
            options += " and " + req.query.datefield + " <= '" + req.query.toDate + " 23:59:59'";
        }
    }
    else {
        console.log("toDate is invalid date");
    }
    console.log("options = '" + options + "'");

    var isTrueSet = (req.query.isAdmin);
    console.log("isTrueSet = " + isTrueSet);


    var fields = " id, CONVERT(varchar,datePar,103) datePar,customerName,case when customerPhone = 'null' Then '' else  ISNULL(customerPhone,'') END phone, ISNULL(customerMobile,'') mobile,case when customerEmail = 'null' then'' else ISNULL(customerEmail,'' ) end [customerEmail],simpleDelivery,antikatavoli,deliverySuturday,deliveryPivkup,case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher,commission,costPayOnDelivary,trasportationCost,weight,netprice,vat,total,extraVouchers, voucherReturn,companyName,weight,courierReceived,parcelReturned,deliveredToCustomer ";//CONVERT(varchar,datePar,103)
    if (isTrueSet) {
        fields = " id,courierCode,wholesalerPayed,CONVERT(varchar,wholesalerGotPayedDate,103) wholesalerGotPayedDate, CONVERT(varchar,CronInvoicedDate,103) CronInvoicedDate, CONVERT(varchar,datePar,103) datePar, timePar, customerName, customerAddress, customerCity, customerZip, case when customerPhone = 'null' Then '' else  ISNULL(customerPhone,'') END phone, ISNULL(customerMobile,'') mobile, case when customerEmail = 'null' then'' else ISNULL(customerEmail,'' ) end [customerEmail], companyID, companyName, simpleDelivery, antikatavoli, deliverySuturday, deliveryPivkup,case isnull(left(voucher,1),'4') when '1' then '0' + voucher else voucher end voucher, voucherReturn, notes, notesForCourier, userId, commission, trasportationCost, costPayOnDelivary, weight, netPrice, vat, total, courierReceived, parcels, extraVouchers, CONVERT(varchar,courierReceivedDate,103) courierReceivedDate, customerGotPayed, CONVERT(varchar,customerGotPayedDate,103) customerGotPayedDate, courierPayed, CONVERT(varchar,courierPayedDate,103) courierPayedDate, parcelReturned, CONVERT(varchar,parcelReturnedDate,103) parcelReturnedDate, deliveredToCustomer, CONVERT(varchar,deliveredToCustomerDate,103) deliveredToCustomerDate, courierPayedAmount, lockWithDiference, lockWithDiferenceDate, payFromStartCourier,CONVERT(varchar,PayFromStartCourierDate,103) PayFromStartCourierDate,StartCourierCost,cronCourierCost,WholesalerCost,CronInvoiced,CroneInvoiceNumber,WholesalerInvoiced ";
    }

    if (req.query.IsPayedFromCourier) {
        var IsPayedFromCourier = (req.query.IsPayedFromCourier);
        if (IsPayedFromCourier == "true") {
            options += " and IsNull(customerGotPayed,0) = 1 ";
        }
        else {
            options += " and IsNull(customerGotPayed,0) = 0 ";
        }
    }
    console.log("IsPayedFromCourier = " + IsPayedFromCourier + " typeof " + typeof (IsPayedFromCourier));
    //customerGotPayed,wholesalerGotPayed,courierGotPayed
    if (req.query.customerGotPayed) {
        var customerGotPayed = (req.query.customerGotPayed);
        if (customerGotPayed == "true") {
            options += " and IsNull(customerGotPayed,0) = 1 ";
        }
        else {
            options += " and IsNull(customerGotPayed,0) = 0 ";
        }
    }
    console.log("customerGotPayed = " + customerGotPayed + " typeof " + typeof (customerGotPayed));


    if (req.query.wholesalerGotPayed) {
        var wholesalerGotPayed = (req.query.wholesalerGotPayed);
        if (wholesalerGotPayed == "true") {
            options += " and wholesalerGotPayedDate is not null ";
        }
        else {
            options += " and wholesalerGotPayedDate is null ";
        }
    }
    console.log("wholesalerGotPayed = " + wholesalerGotPayed + " typeof " + typeof (wholesalerGotPayed));

    if (req.query.courierGotPayed) {
        var courierGotPayed = (req.query.courierGotPayed);
        if (courierGotPayed == "true") {
            options += " and IsNull(payfromstartcourier,0) = 1 ";
        }
        else {
            options += " and IsNull(payfromstartcourier,0) = 0 ";
        }
    }
    console.log("courierGotPayed = " + courierGotPayed + " typeof " + typeof (courierGotPayed));

    if (req.query.courierReceived) {
        var courierReceived = (req.query.courierReceived);
        if (courierReceived == "true") {
            options += " and ISNULL(courierReceivedDate,'1970-01-01') > '2022-01-01'  ";
        }
        else {
            options += " and courierReceivedDate is null ";
        }
    }
    console.log("courierReceived = " + courierReceived + " typeof " + typeof (courierReceived));

    if (req.query.Delivered2Customer) {
        var Delivered2Customer = (req.query.Delivered2Customer);
        if (Delivered2Customer == "true") {
            options += " and IsNull(deliveredToCustomer,0) = 1";
        }
        else {
            options += " and IsNull(deliveredToCustomer,0) = 0";
        }
    }
    console.log("deliveredToCustomer = " + Delivered2Customer + " typeof " + typeof (Delivered2Customer));

    if (req.query.Returns) {
        var Returns = (req.query.Returns);
        if (Returns == "true") {
            options += " and IsNull(parcelReturned,0) = 1";
        }
        else {
            options += " and IsNull(parcelReturned,0) = 0";
        }
    }
    console.log("Returns = " + Returns + " typeof " + typeof (Returns));

    if (req.query.invoiced) {
        var invoiced = (req.query.invoiced);
        if (invoiced == "true") {
            options += " and IsNull(CronInvoiced,0) = 1";
        }
        else {
            options += " and IsNull(CronInvoiced,0) = 0";
        }
    }
    console.log("invoiced = " + invoiced + " typeof " + typeof (invoiced));

    //req.query.wholesalerid
    if (req.query.wholesalerid) {
        var wholesalerid = (req.query.wholesalerid);
        options += " and wholesalerid = " + wholesalerid;
    }
    console.log("wholesalerid = " + wholesalerid + " typeof " + typeof (wholesalerid));



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