const express = require('express')
const router = express.Router()
const { poolPromise } = require('./db')
const functions = require('./functions')

router.get('/', async (req, res) => {
  console.log('get user received!');
  var user = req.query.userName;
  console.log("username= " + user);
  var wholesalerid = req.query.wholesalerid;
  console.log("wholesalerid= " + wholesalerid);
  var params = req.query.params;
  console.log("params= " + params);

  if (user === undefined)
    var options = "";
  else
    options = " where userName = '" + user + "'";

  var fields = "";

  if (options == "")
    var fieldOptions = "";
  else if (options)
    fieldOptions = " ,LTRIM(RTRIM(password)) password ";


  console.log("options = " + options);
  console.log("fieldOptions = " + fieldOptions);
  var queryStr = "SELECT userid, name Name,AdminLevel,wholeSalerId ,userPhone [Phone],userMobile [userMobile],userEmail [userEmail],username [username],IsNull(TopMargin,0) TopMargin,IsNull(LeftMargin,0) LeftMargin " + fieldOptions + " FROM [users] " + options;

  if (params == 2) {
    if (wholesalerid) {
      queryStr = "select users.userid,name,username,ISNULL(companyName,'') CompanyName,ISNUll(courierCustomerCode, '') CourierCode from users left join companies on companies.userID = users.userid where wholesalerid = " + wholesalerid;
    }
    else {
      queryStr = "select users.userid,name,username,ISNULL(companyName,'') CompanyName,ISNUll(courierCustomerCode, '') CourierCode from users left join companies on companies.userID = users.userid";
    }
  }
  if (params == 3) {
    queryStr = "select users.userid,users.name,users.username,ISNULL(companyName,'') CompanyName,ISNUll(courierCustomerCode, '') CourierCode, ISNULL(wholesalers.name,'') [Group] from users left join companies on companies.userID = users.userid left join users as wholesalers on wholesalers.userid = users.wholesalerid";
  }


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
  console.log('post user received!');
  // Εδώ διαβάζω το body από το request
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  var userID = JSON.parse(data).userID;
  var Name = JSON.parse(data).Name;
  var Phone = JSON.parse(data).Phone;
  var userMobile = JSON.parse(data).userMobile;
  var userEmail = JSON.parse(data).userEmail;
  var username = JSON.parse(data).username;
  var password = JSON.parse(data).password;
  var leftMargin = JSON.parse(data).leftMargin;
  var topMargin = JSON.parse(data).TopMargin;
  var wholeSalerId = JSON.parse(data).wholeSalerId;
  var adminLevel = JSON.parse(data).adminLevel;

  console.log('post user received!');
  console.log("userID " + userID);
  console.log("Name " + Name);
  console.log("Phone " + Phone);
  console.log("userMobile " + userMobile);
  console.log("userEmail " + userEmail);
  console.log("username " + username);
  console.log("password " + password);
  console.log("leftMargin " + leftMargin);
  console.log("topMargin " + topMargin);
  console.log("wholeSalerId " + wholeSalerId);
  console.log("adminLevel " + adminLevel);

  var hasError = false;
  var isNewUser = true;

  if (userID !== undefined)
    isNewUser = false;
  console.log("isNewUser = " + isNewUser);

  if (isNewUser) { // Εισαγωγή νέου χρήστη
    if (Name !== undefined) {
      if (Name.length > 100) {
        if (!hasError) res.sendStatus(400);
        console.log("Name is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError) res.sendStatus(400);
      console.log("Name is invalide error 400");
      hasError = true;
    }

    if (Phone !== undefined) {
      if (Phone.length > 20) {
        if (!hasError)
          res.sendStatus(400);;
        console.log("Phone is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError)
        res.sendStatus(400);
      console.log("Phone is invalide error 400");
      hasError = true;
    }

    if (userMobile !== undefined) {
      if (userMobile.length > 20) {
        if (!hasError)
          res.sendStatus(400);
        console.log("userMobile is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError)
        res.sendStatus(400);
      console.log("userMobile is invalide error 400");
      hasError = true;
    }

    if (userEmail !== undefined) {
      if (userEmail.length > 50) {
        if (!hasError)
          res.sendStatus(400);
        console.log("userEmail is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError)
        res.sendStatus(400);
      console.log("userEmail is invalide error 400");
      hasError = true;
    }

    if (username !== undefined) {
      if (username.length > 30) {
        if (!hasError)
          res.sendStatus(400);
        console.log("username is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError)
        res.sendStatus(400);
      console.log("username is invalide error 400");
      hasError = true;
    }

    if (password !== undefined) {
      if (password.length > 100) {
        if (!hasError)
          res.sendStatus(400);
        console.log("password is invalide error 400");
        hasError = true;
      }
    }
    else {
      if (!hasError)
        res.sendStatus(400);
      console.log("password is invalide error 400");
      hasError = true;
    }

    var wholeSalerIdValue = "null";
    if (functions.isNumber(wholeSalerId)) {
      wholeSalerIdValue = wholeSalerId;
    }

    console.log("wholeSalerIdValue = " + wholeSalerIdValue);

    var adminLevelValue = "null";
    if (functions.isNumber(adminLevel)) {
      adminLevelValue = adminLevel;
    }

    console.log("adminLevelValue = " + adminLevelValue);

    var queryStr = "INSERT INTO [dbo].[users] ([name],[AdminLevel],[userPhone],[userMobile],[userEmail],[username],[password],[TopMargin],[LeftMargin],[wholesalerid]) Values ('" + Name + "', " + adminLevelValue + " ,'" + Phone + "','" + userMobile + "','" + userEmail + "','" + username + "','" + password + "',26,45," + wholeSalerIdValue + ")";
    console.log("query = '" + queryStr + "'");

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
  else //Ενημέρωση χρήστη
  {
    if (Name !== undefined) {
      if (Name.length > 100) {
        if (!hasError) res.sendStatus(400);
        console.log("Name is invalide error 400");
        hasError = true;
      }
    }

    if (Phone !== undefined) {
      if (Phone.length > 20) {
        if (!hasError)
          res.sendStatus(400);;
        console.log("Phone is invalide error 400");
        hasError = true;
      }
    }

    if (userMobile !== undefined) {
      if (userMobile.length > 20) {
        if (!hasError)
          res.sendStatus(400);
        console.log("userMobile is invalide error 400");
        hasError = true;
      }
    }

    if (userEmail !== undefined) {
      if (userEmail.length > 50) {
        if (!hasError)
          res.sendStatus(400);
        console.log("userEmail is invalide error 400");
        hasError = true;
      }
    }

    if (username !== undefined) {
      if (username.length > 30) {
        if (!hasError)
          res.sendStatus(400);
        console.log("username is invalide error 400");
        hasError = true;
      }
    }

    if (password !== undefined) {
      if (password.length > 100) {
        if (!hasError)
          res.sendStatus(400);
        console.log("password is invalide error 400");
        hasError = true;
      }
    }

    var password1 = "";
    if (password) {
      console.log("req body password is " + password);
      password1 = " ,[password] = '" + password + "'";
    }
    console.log("update password is '" + password + "'");

    var LeftMarginQuery = "";
    if (functions.isNumber(leftMargin)) {
      LeftMarginQuery = ", LeftMargin = " + leftMargin;
    }

    var topMarginQuery = "";
    if (functions.isNumber(topMargin)) {
      topMarginQuery = ", TopMargin = " + topMargin;
    }

    var wholeSalerIdQuery = "";
    if (functions.isNumber(wholeSalerId)) {
      wholeSalerIdQuery = ", wholesalerid = " + wholeSalerId;
    }
    var adminLevelQuery = "";
    if (functions.isNumber(adminLevel)) {
      adminLevelQuery = ", adminLevel = " + adminLevel;
    }

    var queryStr = "Update [dbo].[users] set [name] = '" + Name + "', [userPhone] = '" + Phone + "',[userMobile] = '" + userMobile + "',[userEmail] = '" + userEmail + "',[username] = '" + username + "'" + password1 + LeftMarginQuery + topMarginQuery + wholeSalerIdQuery + adminLevelQuery + "   WHERE userid = " + userID;
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
});

module.exports = router