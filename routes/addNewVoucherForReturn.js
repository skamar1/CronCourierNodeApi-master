//addNewVoucherForReturn
const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router()
const { poolPromise } = require('./db')

router.post('/', async (req, res) => {
    console.log("add New Voucher For Return");

    var oldVoucher = req.query.oldVoucher;
    var newVoucher = req.query.newVoucher;
    var date = req.query.date;
    var returnSimple = req.query.returnSimple;

    console.log("oldVoucher = " + oldVoucher);
    console.log("newVoucher = " + newVoucher);
    console.log("date" + date);
    console.log("returnSimple" + returnSimple);

    var hasError = false;
    var queryStr = "Exec updateReturnVoucher '" + oldVoucher + "', '" + newVoucher + "', '" + date + "', " + returnSimple;

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