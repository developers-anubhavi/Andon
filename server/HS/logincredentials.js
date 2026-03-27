const express = require("express");
const bcrypt = require("bcrypt");
const { sql, poolPromise } = require("../MK1/db");

const router = express.Router();

router.post("/hs_logincredentials", async (req, res) => {
  const { username, password, requiredUserType } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      field: "both",
      message: "Username and password required",
    });
  }

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("USERNAME", sql.VarChar, username)
      .query(`
        SELECT TOP 1
          ID,
          USERNAME,
          USERID,
          USERTYPE,
          PASSWORD
        FROM ANDON_USER_LOGIN
        WHERE USERNAME = @USERNAME
      `);

    if (!result.recordset.length) {
      return res.status(401).json({
        field: "username",
        message: "Invalid username or password",
      });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({
        field: "password",
        message: "Invalid username or password",
      });
    }

     if (requiredUserType && user.USERTYPE !== requiredUserType) {
      return res.status(403).json({
        field: "usertype",
        message: `Only ${requiredUserType} can log in`,
      });
    }

     res.json({
      success: true,
      username: user.USERNAME,
      usertype: user.USERTYPE,
      userid: user.USERID,
    });

  } catch (err) {
    console.error("Login API Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
