const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log("update customer transactions received");


    var voucher = req.query.voucher;
    var field1 = req.query.field1;
    var field2 = req.query.field2;
    var date = req.query.date;
    var price = req.query.price;
    var weight = req.query.weight;

    console.log("voucher = " + voucher);
    console.log("field1 = " + field1);
    console.log("field2 = " + field2);
    console.log("date = " + date);
    console.log("price = " + price);
    console.log("weight = " + weight);

    var option = "";
    var option1 = "";

    if (price)
    {
        option = ",price = " + price;
    }

    if (weight)
    {
        option1 = ",weight = " + weight;
    }


    var hasError = false;
    var queryStr = "update sales set " + field1 + " = 1," + field2 + " = '" + date + "' " + option + option1 + " where ISNULL(" + field1 + ",0) = 0 and voucher = '" + voucher + "'";

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