const express = require('express');
const bcrypt = require('bcrypt');
const { poolPromise, sql } = require('../MK1/db');

const router = express.Router();

router.post("/bs_login", async (req, res) => {
  // console.log("LOGIN API HIT", req.body);

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username & Password required" });
    }

    const pool = await poolPromise;

    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .query(`
        SELECT TOP 1 *
        FROM ANDON_USER_LOGIN
        WHERE USERNAME = @username COLLATE Latin1_General_CS_AS
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ field: "username" });
    }

    const user = result.recordset[0];

    const match = await bcrypt.compare(password, user.PASSWORD);
    if (!match) {
      return res.status(401).json({ field: "password" });
    }

    if (user.STATUS === "ACTIVE") {
      return res.status(403).json({
        field: "status",
        message: "User already logged in on another device"
      });
    }

    await pool.request()
      .input("username", sql.VarChar, username)
      .query(`
        UPDATE ANDON_USER_LOGIN
        SET STATUS = 'ACTIVE'
        WHERE USERNAME = @username
      `);

    res.json({
      username: user.USERNAME,
      usertype: user.USERTYPE
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/bs_logout", async (req, res) => {
  try {
    const { username } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input("username", sql.VarChar, username)
      .query(`
        UPDATE ANDON_USER_LOGIN
        SET STATUS = 'INACTIVE'
        WHERE USERNAME = @username
      `);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
