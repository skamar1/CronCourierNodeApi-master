const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const functions = require('./functions')
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log('Batch Save sale post received!');
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    var values = JSON.parse(data).values;

    console.log("Insert Sale");
    var resultId = '';
    var queryStr = "Insert into sales (datePar,timePar,customerName,customerAddress,customerCity,customerZip,customerPhone,customerMobile,customerEmail,companyID,companyName,simpleDelivery,antikatavoli,deliverySuturday,deliveryPivkup,voucher,voucherReturn,notes,notesForCourier,userId,commission,trasportationCost,costPayOnDelivary,weight,netPrice,vat,total,courierReceived,extraVouchers,parcels,courierReceivedDate,courierName,courierId,courierCode) Values " + values;
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
})

module.exports = router