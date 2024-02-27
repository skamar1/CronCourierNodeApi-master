const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.get('/', async (req, res) => {
    console.log('Get company received!');
    var user = req.query.userID;
    var companyId = req.query.companyId;
    var wholeSalerId = req.query.wholeSalerId;
    console.log("username= " + user);
    console.log("companyId= " + companyId);
    console.log("wholeSalerId= " + wholeSalerId);

    if (user === undefined)
        var options = "";
    else
        options = " where companies.userID = " + user;
    if (companyId)
    {
        if (options)
        {
            options += " and companies.companyId = " + companyId;   
        }
        else
        {
            options = " where companies.companyId = " + companyId;
        }
    }
    if (wholeSalerId)
    {
        if (options)
        {
            options += " and users.wholesalerid = " + wholeSalerId;   
        }
        else
        {
            options = " where users.wholesalerid = " + wholeSalerId;
        }
    }
    console.log("options= " + options);

    var queryStr = "select users.AdminLevel, companies.companyId,companies.companyName,companies.address,companies.city,companies.zip,companies.phone,companies.email,companies.DefaultCourierId,companies.smsSender,companies.smsApiKey,CourierList.Username,CourierList.Password,CompanyCode,CompanyPassword,BillingCode,companies.userID,companies.courierCustomerCode, companies.companyName + case when ISNULL(companies.courierCustomerCode,'') <> '' then ' - ' else '' END + ISNULL(companies.courierCustomerCode,'') [CompanyNameWithCourierCode],ws.name [Group],CourierList.id,CourierList.code,CourierList.name,CourierList.ApiKey from companies left join users on users.userid = companies.userID left join users as ws on ws.userid = users.wholesalerid LEFT JOIN CourierList on CourierList.id = companies.DefaultCourierId " + options + " Order by courierCustomerCode";
    console.log(queryStr);

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(queryStr)

        res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }

})

module.exports = router