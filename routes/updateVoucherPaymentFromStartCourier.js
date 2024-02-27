const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log('----------------------------\nUpdate payment Received!');

    var datePar = req.query.datePar; 
    var voucher = req.query.voucher; 
    var total = req.query.total; 

    console.log(req.query);
    console.log("datePar = '" + datePar + "'");   
    console.log("voucher = '" + voucher + "'");
    console.log("total = '" + total + "'");
  
    var hasError = false;
    // DateTime
    if (!datePar instanceof Date) {
        res.sendStatus(400);
        console.log("datePar is invalide error 400");
        hasError = true;
    }

    //Numbers
    if (!functions.isNumber(total)) {
        if (!hasError)
            res.sendStatus(400);
        console.log("total is invalide error 400");
        hasError = true;
    }
   

    //string

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

    if (!hasError) {
            console.log("Update Sale");
            var queryStr = "update sales set payFromStartCourier = 1,payFromStartCourierDate = '" + datePar + "',courierPayedAmount = " + total + " where voucher = '" + voucher + "'";
            console.log(queryStr);

            try {
                const pool = await poolPromise
                const result = await pool.request()
                    .query(queryStr)

                //res.json(result.recordset)
                res.status(201)            
                res.json(result)
            } catch (err) {
                res.status(500)
                res.send(err.message)
            }
        
    }

})

module.exports = router