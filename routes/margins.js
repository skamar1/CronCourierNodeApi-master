const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')
const functions = require('./functions')

router.get('/', async (req, res) => {
  console.log('get margins received!');
  var user = req.query.userName;
  console.log("user= " + user);
  if (user === undefined)
    var options = "";
  else
    options = " where userName = '" + user + "'";



  console.log("options = " + options);
  var queryStr = "SELECT userid, TopMargin,IsNull(LeftMargin,0) LeftMargin FROM [users] " + options;
  console.log("<<< " + queryStr + " >>>");

  try {
    const pool = await poolPromise
    const result = await pool.request()
      //.input('username', sql.VarChar(30), user)
      .query(queryStr)

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
});

router.post("/", async function (req, res) {
  console.log('post margins received!');
  // Εδώ διαβάζω το body από το request
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  var userID = JSON.parse(data).userID;
  var leftMargin = JSON.parse(data).leftMargin;
  var topMargin = JSON.parse(data).TopMargin;

  console.log('post margins received!');
  console.log("left Margin " + leftMargin);
  console.log("Top Margin " + TopMargin);
  var hasError = false;

  if (userID !== undefined)
    isNewUser = false;
  console.log("isNewUser = " + isNewUser);


 

    var LeftMarginQuery = "";
    if (functions.isNumber(leftMargin)) {
      LeftMarginQuery = " LeftMargin = " + leftMargin;
    }

    var topMarginQuery = "";
    if (functions.isNumber(topMargin)) {
      topMarginQuery = ", LeftMargin = " + topMargin;
    }

    var queryStr = "Update [dbo].[users] set " + printCompanyDetailsId + LeftMarginQuery + topMarginQuery + "   WHERE userid = " + userID;
    console.log("<<< " + queryStr + " >>>");
    if (!hasError) {
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
);

module.exports = router