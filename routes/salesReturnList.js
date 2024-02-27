const express = require('express')
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log("sales Return list request received");
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

    var options = " Where returnSales.companyid is not null";// " where courierReceivedDate is not null and ISNULL(customerGotPayed,0) = 0";
    if (req.query.companyID) {
        if (req.query.companyID != "-1") {
            options = " where returnSales.companyID = '" + req.query.companyID + "'";
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

    var fields = " returnSales.id, case when isnull(left(returnSales.voucher,1),'4') = '1' or isnull(left(returnSales.voucher,1),'4') = '5' then '0' + returnSales.voucher else returnSales.voucher end ReturnVoucher, ISNULL(CONVERT(varchar,returnSales.courierReceivedDate,103), CONVERT(varchar,sales.parcelReturnedDate,103)) returnStartDate,CONVERT(varchar,returnSales.deliveredToCustomerDate,103) returnDeliveredToCustomerDate,returnSales.CompanyID,returnSales.companyName,returnSales.customerName,ISNULL(returnSales.customerGotPayed,0) CustomerGotPayed, CONVERT(varchar,returnSales.customerGotPayedDate,103) customerGotPayedDate , returnSales.total,returnSales.weight, " +
                 " sales.id startId, case  when isnull(left(sales.voucher,1),'4') = '1' or isnull(left(sales.voucher,1),'4') = '5' then '0' + sales.voucher else sales.voucher end  [startVoucher],CONVERT(varchar,sales.courierReceivedDate,103) StartCourierReceivedDate,ISNULL(sales.customerGotPayed,0) StartCustomerGotPayed, CONVERT(varchar,sales.customerGotPayedDate,103) StartcustomerGotPayedDate, ISNULL(sales.courierpayed,0) StartCourierPayed ";//CONVERT(varchar,datePar,103)

    if (req.query.IsPayedFromCourier) {
        var IsPayedFromCourier = (req.query.IsPayedFromCourier);
        if (IsPayedFromCourier == "true") {
            options += " and IsNull(returnSales.customerGotPayed,0) = 1 ";
        }
        else {
            options += " and IsNull(returnSales.customerGotPayed,0) = 0 ";
        }
    }
    console.log("IsPayedFromCourier = " + IsPayedFromCourier + " typeof " + typeof (IsPayedFromCourier));

    if (req.query.CourierReceived) {
        var CourierReceived = (req.query.CourierReceived);
        if (CourierReceived == "true") {
            options += " and IsNull(returnSales.courierReceived,0) = 1";
        }
        else {
            options += " and IsNull(returnSales.courierReceived,0) = 0";
        }
    }
    console.log("courierReceived = " + CourierReceived + " typeof " + typeof (CourierReceived));

    if (req.query.Delivered2Customer) {
        var Delivered2Customer = (req.query.Delivered2Customer);
        if (Delivered2Customer == "true") {
            options += " and IsNull(returnSales.deliveredToCustomer,0) = 1";
        }
        else {
            options += " and IsNull(returnSales.deliveredToCustomer,0) = 0";
        }
    }
    console.log("deliveredToCustomer = " + Delivered2Customer + " typeof " + typeof (Delivered2Customer));
    
    options += " and returnSales.customerAddress is null and sales.voucherReturn <> '0' ";
        
    
    //console.log("IsPayedFromCourier = " + ReturnVoucher + " typeof " + typeof (ReturnVoucher));

    var queryStr = "SELECT " + fields + " from sales as returnSales " +
                   "left join sales on returnSales.voucher = sales.voucherReturn" + options;
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