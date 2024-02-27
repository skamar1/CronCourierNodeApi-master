const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    var companyid = JSON.parse(data).companyid;
    var companyName = JSON.parse(data).companyName;
    var address = JSON.parse(data).address;
    var city = JSON.parse(data).city;
    var zip = JSON.parse(data).zip;
    var phone = JSON.parse(data).phone;
    var email = JSON.parse(data).email;
    var username = JSON.parse(data).username;
    var userID = JSON.parse(data).userID;
    var pricePerKilo1stPart = JSON.parse(data).pricePerKilo1stPart;
    var pricePerKilo2ntPart = JSON.parse(data).pricePerKilo2ntPart;
    var pricePerKilo3rdPart = JSON.parse(data).pricePerKilo3rdPart;
    var pricePerKilo4thPart = JSON.parse(data).pricePerKilo4thPart;
    var weight1stPart = JSON.parse(data).weight1stPart;
    var weight2ntPart = JSON.parse(data).weight2ntPart;
    var weight3rdPart = JSON.parse(data).weight3rdPart;
    var CostForPayOnDelivery = JSON.parse(data).CostForPayOnDelivery;
    var OveralPercentage = JSON.parse(data).OveralPercentage;
    var customerID = JSON.parse(data).customerID;
    var smsApiKey = JSON.parse(data).smsApiKey;
    var smsSender = JSON.parse(data).smsSender;

    console.log('company post received!');
    console.log("companyid = '" + companyid + "'");
    console.log("companyName = '" + companyName + "'");
    console.log("address = '" + address + "'");
    console.log("city = '" + city + "'");
    console.log("zip = '" + zip + "'");
    console.log("phone = '" + phone + "'");
    console.log("email = '" + email + "'");
    console.log("username = '" + username + "'");
    console.log("userID = '" + userID + "'");
    console.log("pricePerKilo1stPart = '" + pricePerKilo1stPart + "'");
    console.log("pricePerKilo2ntPart = '" + pricePerKilo2ntPart + "'");
    console.log("pricePerKilo3rdPart = '" + pricePerKilo3rdPart + "'");
    console.log("pricePerKilo4thPart = '" + pricePerKilo4thPart + "'");
    console.log("weight1stPart = '" + weight1stPart + "'");
    console.log("weight2ntPart = '" + weight2ntPart + "'");
    console.log("weight3rdPart = '" + weight3rdPart + "'");
    console.log("CostForPayOnDelivery = '" + CostForPayOnDelivery + "'");
    console.log("OveralPercentage = '" + OveralPercentage + "'");
    console.log("customerID = '" + customerID + "'"); //Easy mail Customer ID
    console.log("smsSender = '" + smsSender + "'");
    console.log("smsApiKey = '" + smsApiKey + "'");
    var hasError = false;


    if (companyName !== undefined) {
        if (companyName.length > 100) {
            if (!hasError)
                res.sendStatus(400);
            console.log("companyName is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("companyName is invalide error 400");
        hasError = true;
    }

    if (address !== undefined) {
        if (address.length > 100) {
            if (!hasError)
                res.sendStatus(400);
            console.log("address is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("address is invalide error 400");
        hasError = true;
    }

    if (city !== undefined) {
        if (city.length > 50) {
            if (!hasError)
                res.sendStatus(400);
            console.log("city is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("city is invalide error 400");
        hasError = true;
    }

    if (zip !== undefined) {
        if (zip.length > 10) {
            if (!hasError)
                res.sendStatus(400);
            console.log("zip is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("zip is invalide error 400");
        hasError = true;
    }

    if (phone !== undefined) {
        if (phone.length > 10) {
            if (!hasError)
                res.sendStatus(400);
            console.log("phone is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("phone is invalide error 400");
        hasError = true;
    }

    if (email !== undefined) {
        if (email.length > 50) {
            if (!hasError)
                res.sendStatus(400);
            console.log("email is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("email is invalide error 400");
        hasError = true;
    }
    if (userID != undefined) {
        var userid = userID;
        if (typeof (userid) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("userID is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("userID is invalide error 400");
        hasError = true;
    }

    if (pricePerKilo1stPart != undefined) {
        var pricePerKilo1stPart = pricePerKilo1stPart;
        if (typeof (pricePerKilo1stPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("pricePerKilo1stPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("pricePerKilo1stPart is invalide error 400");
        hasError = true;
    }

    if (pricePerKilo2ntPart != undefined) {
        var pricePerKilo2ntPart = pricePerKilo2ntPart;
        if (typeof (pricePerKilo2ntPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("pricePerKilo2ntPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("pricePerKilo2ntPart is invalide error 400");
        hasError = true;
    }

    if (pricePerKilo3rdPart != undefined) {
        var pricePerKilo3rdPart = pricePerKilo3rdPart;
        if (typeof (pricePerKilo3rdPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("pricePerKilo3rdPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("pricePerKilo3rdPart is invalide error 400");
        hasError = true;
    }

    if (pricePerKilo4thPart != undefined) {
        var pricePerKilo4thPart = pricePerKilo4thPart;
        if (typeof (pricePerKilo4thPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("pricePerKilo4thPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("pricePerKilo4thPart is invalide error 400");
        hasError = true;
    }

    if (weight1stPart != undefined) {
        var weight1stPart = weight1stPart;
        if (typeof (weight1stPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("weight1stPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("weight1stPart is invalide error 400");
        hasError = true;
    }

    if (weight2ntPart != undefined) {
        var weight2ntPart = weight2ntPart;
        if (typeof (weight2ntPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("weight2ntPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("weight2ntPart is invalide error 400");
        hasError = true;
    }

    if (weight3rdPart != undefined) {
        var weight3rdPart = weight3rdPart;
        if (typeof (weight3rdPart) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("weight3rdPart is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("weight3rdPart is invalide error 400");
        hasError = true;
    }

    if (CostForPayOnDelivery != undefined) {
        var CostForPayOnDelivery = CostForPayOnDelivery;
        if (typeof (CostForPayOnDelivery) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("CostForPayOnDelivery is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("CostForPayOnDelivery is invalide error 400");
        hasError = true;
    }

    if (OveralPercentage != undefined) {
        var OveralPercentage = OveralPercentage;
        if (typeof (OveralPercentage) != 'number') {
            if (!hasError)
                res.sendStatus(400);
            console.log("OveralPercentage is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("OveralPercentage is invalide error 400");
        hasError = true;
    }

    if (customerID !== undefined) {
        if (customerID.length > 6) {
            if (!hasError)
                res.sendStatus(400);
            console.log("customerID is invalide error 400");
            hasError = true;
        }
    }
    else {
        if (!hasError)
            res.sendStatus(400);
        console.log("customerID  is invalide error 400");
        hasError = true;
    }

    if (!hasError) {
        if (!companyid) {
            var queryStr = "INSERT INTO [dbo].[companies] ([companyName],[address],[city],[zip],[phone],[email],[userID],[pricePerKilo1stPart],[pricePerKilo2ntPart],[pricePerKilo3rdPart],[pricePerKilo4thPart],[weight1stPart],[weight2ntPart],[weight3rdPart],[CostForPayOnDelivery],[OveralPercentage], [customerID],[smsSender],[smsApiKey]) " +
                " Values ('" + companyName + "', '" + address + "','" + city + "','" + zip + "','" + phone + "','" + email + "'," + userID + "," + pricePerKilo1stPart + "," + pricePerKilo2ntPart + "," + pricePerKilo3rdPart + "," + pricePerKilo4thPart + "," + weight1stPart + ", " + weight2ntPart + ", " + weight3rdPart + ", " + CostForPayOnDelivery + ", " + OveralPercentage + ", " + customerID + ",'" + smsSender + "','" + smsApiKey + "')";
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

            var queryStr = "Update [dbo].[companies] set [companyName] ='" + companyName + "',[address] = '" + address + "',[city] = '" + city + "',[zip] = '" + zip + "',[phone] = '" + phone + "',[email] = '" + email + "',[userID] = " + userID + ",[pricePerKilo1stPart] = " + pricePerKilo1stPart + ",[pricePerKilo2ntPart] = " + pricePerKilo2ntPart + ",[pricePerKilo3rdPart] = " + pricePerKilo3rdPart + ",[pricePerKilo4thPart] = " + pricePerKilo4thPart + ",[weight1stPart] = " + weight1stPart + ",[weight2ntPart] = " + weight2ntPart + ",[weight3rdPart] = " + weight3rdPart + ",[CostForPayOnDelivery] = " + CostForPayOnDelivery + ",[OveralPercentage] = " + OveralPercentage + ", [customerID] = " + customerID + ",smsSender = '" + smsSender + "',smsApiKey = '" + smsApiKey + "' Where companyId = " + companyid
            console.log("query = '" + queryStr + "'");

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