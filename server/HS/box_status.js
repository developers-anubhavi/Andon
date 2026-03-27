const express = require("express");
const router = express.Router();
const sql = require("mssql");
const { poolPromise } = require("../HS/db");

const allowedColumns = new Set(
  Array.from({ length: 60 }, (_, i) => [
    `BOX${i + 1}_M`,
    `BOX${i + 1}_C`,
  ]).flat()
);


router.post("/hs_update-machine-status", async (req, res) => {
  const { boxM, boxC, mcValue, cValue } = req.body;

  if (!allowedColumns.has(boxM) || !allowedColumns.has(boxC)) {
    return res.status(400).json({ error: "Invalid column name" });
  }

  try {
    const pool = await poolPromise;

    const query = `
      UPDATE MACHINE_CRITICAL_LOGS
      SET ${boxM} = @mcValue,
          ${boxC} = @cValue
      WHERE ID = (
        SELECT TOP 1 ID
        FROM MACHINE_CRITICAL_LOGS
        WHERE LINENAME = 'HS'
        ORDER BY DTE DESC, ID DESC
      )
    `;

    await pool.request()
      .input("mcValue", sql.Int, mcValue)
      .input("cValue", sql.Int, cValue)
      .query(query);

    res.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "DB update failed" });
  }
});


router.get("/hs_mc", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
      [BOX1_M],[BOX1_C],[BOX2_M],[BOX2_C],[BOX3_M],[BOX3_C],[BOX4_M],[BOX4_C],[BOX5_M],[BOX5_C],[BOX6_M],[BOX6_C],
      [BOX7_M],[BOX7_C],[BOX8_M],[BOX8_C],[BOX9_M],[BOX9_C],[BOX10_M],[BOX10_C],[BOX11_M],[BOX11_C],[BOX12_M],[BOX12_C],
      [BOX13_M],[BOX13_C],[BOX14_M],[BOX14_C],[BOX15_M],[BOX15_C],[BOX16_M],[BOX16_C],[BOX17_M],[BOX17_C],[BOX18_M],[BOX18_C],
      [BOX19_M],[BOX19_C],[BOX20_M],[BOX20_C],[BOX21_M],[BOX21_C],[BOX22_M],[BOX22_C],[BOX23_M],[BOX23_C],[BOX24_M],[BOX24_C],
      [BOX25_M],[BOX25_C],[BOX26_M],[BOX26_C],[BOX27_M],[BOX27_C],[BOX28_M],[BOX28_C],[BOX29_M],[BOX29_C],[BOX30_M],[BOX30_C],
      [BOX31_M],[BOX31_C],[BOX32_M],[BOX32_C],[BOX33_M],[BOX33_C],[BOX34_M],[BOX34_C],[BOX35_M],[BOX35_C],[BOX36_M],[BOX36_C],
      [BOX37_M],[BOX37_C],[BOX38_M],[BOX38_C],[BOX39_M],[BOX39_C],[BOX40_M],[BOX40_C],[BOX41_M],[BOX41_C],[BOX42_M],[BOX42_C],
      [BOX43_M],[BOX43_C],[BOX44_M],[BOX44_C],[BOX45_M],[BOX45_C],[BOX46_M],[BOX46_C],[BOX47_M],[BOX47_C],[BOX48_M],[BOX48_C],
      [BOX49_M],[BOX49_C],[BOX50_M],[BOX50_C],[BOX51_M],[BOX51_C],[BOX52_M],[BOX52_C],[BOX53_M],[BOX53_C],[BOX54_M],[BOX54_C],
      [BOX55_M],[BOX55_C],[BOX56_M],[BOX56_C],[BOX57_M],[BOX57_C],[BOX58_M],[BOX58_C],[BOX59_M],[BOX59_C],[BOX60_M],[BOX60_C]
FROM MACHINE_CRITICAL_LOGS
WHERE LINENAME = 'HS';

    `);


    res.status(200).json(result.recordset[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});


module.exports = router;
