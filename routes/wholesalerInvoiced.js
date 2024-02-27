const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')

router.post("/", async function (req, res) {
    console.log("Wholesaler Payed received");
    console.log("id = " + req.query.id);
    console.log("invoicenumber = " + req.query.invoicenumber);
    var id = req.query.id;
    var invoicenumber = req.query.invoicenumber;


    var queryStr = "update sales set CronInvoiced = 1,CroneInvoiceNumber = '" + invoicenumber + "' ,CronInvoicedDate = GETDATE() where id in " + id;
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


})

module.exports = router