const express = require('express')
// require route handlers.
// they will all include the same connection pool
const usersRouter = require('./routes/users')
const set2Router = require('./routes/set2')
const companiesRouter = require('./routes/companies')
const companyRouter = require('./routes/company')
const salesNewNumberRouter = require('./routes/salesNewNumber')
const saveSaleRouter = require('./routes/saveSale')
const salesListRouter = require('./routes/salesList')
const salesListReturnRouter = require('./routes/salesReturnList')
const getParastRouter = require('./routes/getParast')
const salesListForPaymentRouter = require('./routes/salesListForPayment')
const lockTransactionsRouter = require('./routes/lockTransactions')
const getpendingsalesRouter = require('./routes/getpendingsales')
const updateCustomersTransactionsRouter = require('./routes/updateCustomersTransactions')
const addNewVoucherForReturnRouter = require('./routes/addNewVoucherForReturn')
const marginsRouter = require('./routes/margins')
const getParastbyVoucherRouter = require('./routes/getParastbyVoucher')
const updateReturnVoucherRouter = require('./routes/updateReturnVoucher')
const courierListVoucherRouter = require('./routes/courierList')
const updateWeightAndCostRouter = require('./routes/updateWeightAndCost')
const updateSalesFromCourierRouter = require('./routes/updateSalesFromCourier')
const searchVoucherRouter = require('./routes/searchVoucher')
const wholesalerPayedRouter = require('./routes/wholesalerPayed')
const wholesalerInvoicedRouter = require('./routes/wholesalerInvoiced')
const getWholesalersRouter = require('./routes/getWholesalers')
const checkIfVoucherExistsRouter = require('./routes/checkIfVoucherExists')
const updateVoucherPaymentFromStartCourierRouter = require('./routes/updateVoucherPaymentFromStartCourier')
const BulksaveSaleRouter = require('./routes/BulksaveSale')



// generic express stuff
const app = express()
// ...
app.use('/api/users', usersRouter)
app.use('/api/companies', companiesRouter);
app.use('/api/company', companyRouter);
app.use('/api/salesNewNumber', salesNewNumberRouter);
app.use('/api/saveSale', saveSaleRouter);
app.use('/api/salesList', salesListRouter);
app.use('/api/salesReturnList', salesListReturnRouter);
app.use('/api/getParast', getParastRouter);
app.use('/api/salesListForPayment', salesListForPaymentRouter);
app.use('/api/lockTransactions', lockTransactionsRouter);
app.use('/api/getpendingsales', getpendingsalesRouter);
app.use('/api/updateCustomersTransactions', updateCustomersTransactionsRouter);
app.use('/api/addNewVoucherForReturn', addNewVoucherForReturnRouter);
app.use('/api/margins', marginsRouter);
app.use('/api/getParastbyVoucher', getParastbyVoucherRouter);
app.use('/api/updateReturnVoucher', updateReturnVoucherRouter);
app.use('/api/courierList', courierListVoucherRouter);
app.use('/api/updateWeightAndCost', updateWeightAndCostRouter);
app.use('/api/updateSalesFromCourier', updateSalesFromCourierRouter);
app.use('/api/searchVoucher', searchVoucherRouter);
app.use('/api/wholesalerPayed', wholesalerPayedRouter);
app.use('/api/wholesalerInvoiced', wholesalerInvoicedRouter);
app.use('/api/updateVoucherPaymentFromStartCourier', updateVoucherPaymentFromStartCourierRouter);
app.use('/api/getWholesalers', getWholesalersRouter);
app.use('/api/checkIfVoucherExists', checkIfVoucherExistsRouter);
app.use('/api/BulksaveSale', BulksaveSaleRouter);
app.use('/set2', set2Router)


// No need to connect the pool
// Just start the web server

const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})