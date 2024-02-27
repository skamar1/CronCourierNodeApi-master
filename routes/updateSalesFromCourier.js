const express = require('express');
const { date } = require('joi');
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log('update Sales From Courier!');
    var voucher = req.query.voucher;
    var courierPickupDate = req.query.courierPickupDate;
    var delivery_flag = req.query.deliveryflag;
    var returned_flag = req.query.returnedflag;
    var delivery_date = req.query.deliverydate;
    var delivery_info = req.query.deliveryinfo;
    var deleted = req.query.deleted;
    var customerReceivedDate = req.query.customerReceivedDate;
    var options = "";
    var oldVoucher = voucher.replace("-R", "");

    console.log("voucher= " + voucher);
    console.log("courierPickupDate= " + courierPickupDate);
    console.log("delivery_flag= " + delivery_flag);
    console.log("returned_flag= " + returned_flag);
    console.log("delivery_date= " + delivery_date);
    console.log("delivery_info= " + delivery_info);
    console.log("deleted= " + deleted);
    console.log("customerReceivedDate= " + customerReceivedDate);

    hasError = false;
    if (voucher === undefined) {
        res.status(400)
        res.send("voucher is required")
        hasError = true;
        return;

    }

    if (courierPickupDate) {
        options = "courierReceivedDate = '" + courierPickupDate + "', courierReceived = 1";
    }

    if (delivery_flag) {
        if (typeof options !== 'undefined' && options.length > 0) {
            options += ", deliveredToCustomer = " + delivery_flag;
        }
        else {
            options = "deliveredToCustomer = " + delivery_flag;
        }
    }

    if (returned_flag) {
        if (typeof options !== 'undefined' && options.length > 0) {
            options += ", parcelReturned = " + returned_flag;
        }
        else {
            options = "parcelReturned = " + returned_flag;
        }
    }
    if (delivery_date && delivery_date != "" && delivery_date != "null") {
        if (typeof options !== 'undefined' && options.length > 0) {
            options += ", deliveredToCustomerDate = '" + delivery_date + "'";
        }
        else {
            options = "deliveredToCustomerDate = '" + delivery_date + "'";
        }
    }
    if (delivery_info) {
        if (typeof options !== 'undefined' && options.length > 0) {
            options += ", deliveryInfo = '" + delivery_info + "'";
        }
        else {
            options = "deliveryInfo = '" + delivery_info + "'";
        }
    }

    if (deleted) {
        if (typeof options !== 'undefined' && options.length > 0) {
            options += ", deleted = " + deleted;
        }
        else {
            options = "deleted = " + deleted;
        }
    }

    // if (customerReceivedDate && customerReceivedDate != "") {
    //     if (typeof options !== 'undefined' && options.length > 0) {
    //         options += ", deliveredToCustomerDate = '" + customerReceivedDate + "'";
    //     }
    //     else {
    //         options = "deliveredToCustomerDate = '" + customerReceivedDate + "'";
    //     }
    // }

    console.log(options);

    if (!hasError) {

        var queryStr = "IF EXISTS (Select * from sales where voucher = '" + voucher + "') " +
            "BEGIN " +
            "update sales set " + options + " where voucher = '" + voucher + "' " +
            "END " +
            "ELSE " +
            "BEGIN " +
            "EXECUTE [dbo].[updateReturnVoucher]  '" + oldVoucher + "','" + voucher + "','" + customerReceivedDate + "',1 " +
            "END";
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
    }

})

module.exports = router