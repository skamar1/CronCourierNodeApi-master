const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log('Save sale post received!');
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    var id = JSON.parse(data).id;
    var datePar = JSON.parse(data).datePar;
    var timePar = JSON.parse(data).timePar;
    var customerName = JSON.parse(data).customerName;
    var customerAddress = JSON.parse(data).customerAddress;
    var customerCity = JSON.parse(data).customerCity;
    var customerZip = JSON.parse(data).customerZip;
    var customerPhone = JSON.parse(data).customerPhone;
    var customerMobile = JSON.parse(data).customerMobile;
    var customerEmail = JSON.parse(data).customerEmail;
    var companyID = JSON.parse(data).companyID;
    var companyName = JSON.parse(data).companyName;
    var simpleDelivery = JSON.parse(data).simpleDelivery;
    var antikatavoli = JSON.parse(data).antikatavoli;
    var deliverySuturday = JSON.parse(data).deliverySuturday;
    var deliveryPivkup = JSON.parse(data).deliveryPivkup;
    var voucher = JSON.parse(data).voucher;
    var voucherReturn = JSON.parse(data).voucherReturn;
    var notes = JSON.parse(data).notes;
    var notesForCourier = JSON.parse(data).notesForCourier;
    var userId = JSON.parse(data).userId;
    var commission = JSON.parse(data).commission;
    var trasportationCost = JSON.parse(data).trasportationCost;
    var costPayOnDelivary = JSON.parse(data).costPayOnDelivary;
    var weight = JSON.parse(data).weight;
    var netPrice = JSON.parse(data).netPrice;
    var vat = JSON.parse(data).vat;
    var total = JSON.parse(data).total;
    var courierReceived = JSON.parse(data).courierReceived;
    var parcels = JSON.parse(data).parcels;
    var extraVouchers = JSON.parse(data).extraVouchers;
    var courierName = JSON.parse(data).courierName;
    var courierId = JSON.parse(data).courierId;
    var deliveryInfo = JSON.parse(data).deliveryInfo;
    var courierCode = JSON.parse(data).courierCode;

    console.log("id = '" + id + "'")
    console.log("datePar = '" + datePar + "'");
    console.log("timePar = '" + timePar + "'");
    console.log("customerName = '" + customerName + "'");
    console.log("customerAddress = '" + customerAddress + "'");
    console.log("customerCity = '" + customerCity + "'");
    console.log("customerZip = '" + customerZip + "'");
    console.log("customerPhone = '" + customerPhone + "'");
    console.log("customerMobile = '" + customerMobile + "'");
    console.log("customerEmail = '" + customerEmail + "'");
    console.log("companyID = '" + companyID + "'");
    console.log("companyName = '" + companyName + "'");
    console.log("simpleDelivery = '" + simpleDelivery + "'");
    console.log("antikatavoli = '" + antikatavoli + "'");
    console.log("deliverySuturday = '" + deliverySuturday + "'");
    console.log("deliveryPivkup = '" + deliveryPivkup + "'");
    console.log("voucher = '" + voucher + "'");
    console.log("voucherReturn = '" + voucherReturn + "'");
    console.log("notes = '" + notes + "'");
    console.log("notesForCourier = '" + notesForCourier + "'");
    console.log("userId = '" + userId + "'");
    console.log("commission = '" + commission + "'");
    console.log("trasportationCost = '" + trasportationCost + "'");
    console.log("costPayOnDelivary = '" + costPayOnDelivary + "'");
    console.log("weight = '" + weight + "'");
    console.log("netPrice = '" + netPrice + "'");
    console.log("vat = '" + vat + "'");
    console.log("total = '" + total + "'");
    console.log("courierReceived = '" + courierReceived + "'");
    console.log("parcels = " + parcels);
    console.log("extraVouchers = " + extraVouchers);
    console.log("courierName = '" + courierName + "'");
    console.log("courierId = '" + courierId + "'");
    console.log("deliveryInfo = '" + deliveryInfo + "'");
    console.log("courierCode = '" + courierCode + "'");

    var hasError = false;
    // DateTime
    if (!datePar instanceof Date) {
        res.sendStatus(400);
        console.log("datePar is invalide error 400");
        hasError = true;
    }
    if (!timePar instanceof Date) {
        if (!hasError)
            res.sendStatus(400);
        console.log("timePar is invalide error 400");
        hasError = true;
    }

    //Numbers
    if (!functions.isNumber(commission)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("commission is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(trasportationCost)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("trasportationCost is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(costPayOnDelivary)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("costPayOnDelivary is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(weight)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("weight is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(netPrice)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("netPrice is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(vat)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("vat is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(total)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("total is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(companyID)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("companyID is invalide error 400");
        hasError = true;
    }
    if (!functions.isNumber(userId)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("userId is invalide error 400");
        hasError = true;
    }

    if (!functions.isNumber(parcels)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("parcels is invalide error 400");
        hasError = true;
    }

    if (!functions.isNumber(courierId)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("courierId is invalide error 400");
        hasError = true;
    }

    //bool
    if (typeof (simpleDelivery) !== "boolean") {
        if (!hasError)
            res.sendStatus(400);
        console.log("simpleDelivery is invalide error 400");
        hasError = true;
    }

    if (typeof (antikatavoli) !== "boolean") {
        if (!hasError)
            res.sendStatus(400);
        console.log("antikatavoli is invalide error 400");
        hasError = true;
    }
    if (typeof (deliverySuturday) !== "boolean") {
        if (!hasError)
            res.sendStatus(400);
        console.log("deliverySuturday is invalide error 400");
        hasError = true;
    }
    if (typeof (deliveryPivkup) !== "boolean") {
        if (!hasError)
            res.sendStatus(400);
        console.log("deliveryPivkup is invalide error 400");
        hasError = true;
    }
    if (typeof (courierReceived) !== "boolean") {
        if (!hasError)
            res.sendStatus(400);
        console.log("courierReceived is invalide error 400");
        hasError = true;
    }
    var simpleDelivery = 0;
    var antikatavoli = 0;
    var deliverySuturday = 0;
    var deliveryPivkup = 0;
    var courierReceived = 0;

    if (simpleDelivery)
        simpleDelivery = 1;

    if (antikatavoli)
        antikatavoli = 1;

    if (deliverySuturday)
        deliverySuturday = 1;

    if (deliveryPivkup)
        deliveryPivkup = 1;

    var courierReceivedDate = "null";
    if (courierReceived) {
        courierReceived = 1;
        courierReceivedDate = "GETDATE()";
    }


    //string
    if (typeof notes === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("notes is invalide error 400");
        hasError = true;
    }

    if (typeof courierName === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("courierName is invalide error 400");
        hasError = true;
    }

    if (typeof voucher === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("voucher is invalide error 400");
        hasError = true;
    }
    else {
        if (voucher) {
            if (voucher.length > 15) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("voucher is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof voucherReturn === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("voucherReturn is invalide error 400");
        hasError = true;
    }
    else {
        if (voucherReturn) {
            if (voucherReturn.length > 15) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("voucherReturn is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerZip === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerZip is invalide error 400");
        hasError = true;
    }
    else {
        if (customerZip) {
            if (customerZip.length > 10) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerZip is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerName === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerName is invalide error 400");
        hasError = true;
    }
    else {
        if (customerName) {
            if (customerName.length > 100) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerName is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerAddress === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerAddress is invalide error 400");
        hasError = true;
    }
    else {
        if (customerAddress) {
            if (customerAddress.length > 100) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerAddress is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof companyName === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("companyName is invalide error 400");
        hasError = true;
    }
    else {

        if (companyName) {
            if (companyName.length > 100) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("companyName is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof notesForCourier === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("notesForCourier is invalide error 400");
        hasError = true;
    }
    else {
        if (notesForCourier) {
            if (notesForCourier.length > 100) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("notesForCourier is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerPhone === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerPhone is invalide error 400");
        hasError = true;
    }
    else {
        if (customerPhone) {
            if (customerPhone.length > 20) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerPhone is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerMobile === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerMobile is invalide error 400");
        hasError = true;
    }
    else {
        if (customerMobile) {
            if (customerMobile.length > 20) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerMobile is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerCity === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerCity is invalide error 400");
        hasError = true;
    }
    else {
        if (customerCity) {
            if (customerCity.length > 50) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerCity is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof customerEmail === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerEmail is invalide error 400");
        hasError = true;
    }
    else {
        if (customerEmail) {
            if (customerEmail.length > 50) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("customerEmail is too long error 400");
                hasError = true;
            }
        }
    }
    if (typeof extraVouchers === 'undefined') {
        if (!hasError)
            res.sendStatus(400);
        console.log("extraVouchers is invalide error 400");
        hasError = true;
    }
    else {
        if (extraVouchers) {
            if (extraVouchers.length > 260) {
                if (!hasError)
                    res.sendStatus(400);
                console.log("extraVouchers is too long error 400");
                hasError = true;
            }
        }
    }

    if (deliveryInfo) {
        if (deliveryInfo.length > 200) {
            if (!hasError)
                res.sendStatus(400);
            console.log("deliveryInfo is too long error 400");
            hasError = true;
        }
    }
    else {
        deliveryInfo = "";
    }

    if (courierCode) {
        if (courierCode.length > 20) {
            if (!hasError)
                res.sendStatus(400);
            console.log("courierCode is too long error 400");
            hasError = true;
        }
    }

    var isUpdate = false;
    if (id) {  // Αν υπάρχει το id κάνω Update
        isUpdate = true;
    }

    if (!hasError) {
        if (isUpdate) {
            console.log("Update Sale");
            var queryStr = "Update sales set datePar = '" + datePar + "', timePar = '" + timePar + "', customerName = '" + customerName + "', customerAddress = '" + customerAddress + "', customerCity = '" + customerCity + "', customerZip = '" + customerZip + "', customerPhone = '" + customerPhone + "', customerMobile = '" + customerMobile + "', customerEmail = '" + customerEmail + "', companyID = " + companyID + ", companyName = '" + companyName + "', simpleDelivery = " + simpleDelivery + ", antikatavoli = " + antikatavoli + ", deliverySuturday = " + deliverySuturday + ", deliveryPivkup = " + deliveryPivkup + ", voucher = '" + voucher + "', voucherReturn = '" + voucherReturn + "', notes = '" + notes + "', notesForCourier = '" + notesForCourier + "', userId = " + userId + ", commission = " + commission + ", trasportationCost = " + trasportationCost + ", costPayOnDelivary = " + costPayOnDelivary + ", weight = " + weight + ", netPrice = " + netPrice + ", vat = " + vat + ", total = " + total + ", courierReceived = " + courierReceived + ",deliveryInfo = '" + deliveryInfo + "',courierCode = '" + courierCode + "' where id = " + id;
            console.log(queryStr);

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

            console.log("Insert Sale");
            var resultId = '';
            var queryStr = "Insert into sales (datePar,timePar,customerName,customerAddress,customerCity,customerZip,customerPhone,customerMobile,customerEmail,companyID,companyName,simpleDelivery,antikatavoli,deliverySuturday,deliveryPivkup,voucher,voucherReturn,notes,notesForCourier,userId,commission,trasportationCost,costPayOnDelivary,weight,netPrice,vat,total,courierReceived,extraVouchers,parcels,courierReceivedDate,courierName,courierId,courierCode,Deleted) Values(GetDate(),GetDate(),'" + customerName + "','" + customerAddress + "','" + customerCity + "','" + customerZip + "','" + customerPhone + "','" + customerMobile + "','" + customerEmail + "'," + companyID + ",'" + companyName + "'," + simpleDelivery + "," + antikatavoli + "," + deliverySuturday + "," + deliveryPivkup + ",'" + voucher + "','" + voucherReturn + "','" + notes + "','" + notesForCourier + "'," + userId + "," + commission + "," + trasportationCost + "," + costPayOnDelivary + "," + weight + "," + netPrice + "," + vat + "," + total + "," + courierReceived + ",'" + extraVouchers + "'," + parcels + "," + courierReceivedDate + ",'" + courierName + "'," + courierId + ",'" + courierCode + "',0)";
            console.log(queryStr);

            try {
                const pool = await poolPromise
                const result = await pool.request()
                    .query(queryStr)

                res.status(201)
                res.send()
            } catch (err) {
                res.status(500)
                res.send(err.message)
            }
        }
    }

})

module.exports = router