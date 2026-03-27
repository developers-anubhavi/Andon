 const express = require("express");
 const router = express.Router();
 const { poolPromise } = require("../HS/db");

 router.get("/hs", async (req, res) => {
   try {
     const pool = await poolPromise;

     const result = await pool.request().query(`
      SELECT TOP 1
      TODAY,
      HS_PRESENT,
      HS_ACTUAL,
      CHS_ACTUAL,
      OVER_TIME,
      MAIN1_STOPTIME_HOUR,
      MAIN1_STOPTIME_MINUTES,
      MAIN1_ACTUAL
      FROM COMMON_TABLE
     `);

     const row = result.recordset[0] || {};

     res.status(200).json({
       hs_today_data: row.TODAY,
       hs_present_data: row.HS_PRESENT,
       hs_hs_actual_data: row.HS_ACTUAL,
       hs_cs_actual_data: row.CHS_ACTUAL,
       hs_over_time_data: row.OVER_TIME,
       hs_stop_time_data: row.MAIN1_STOPTIME_HOUR,
       hs_stop_time_minutes_data: row.MAIN1_STOPTIME_MINUTES,
       hs_actual_data: row.MAIN1_ACTUAL
     });
   } catch (error) {
   console.error("HS API ERROR:", error);
   res.status(500).json({
     message: error.message,
     stack: error.stack
   });
 }
 });

 router.get("/hs_boxes", async (req, res) => {
   try {
     const pool = await poolPromise;

     const result = await pool.request().query(`
       SELECT TOP 1
         box1_name, box2_name, box3_name, box4_name, box5_name,
         box6_name, box7_name, box8_name, box9_name, box10_name,
         box11_name, box12_name, box13_name, box14_name, box15_name,
         box16_name, box17_name, box18_name, box19_name, box20_name,
         box21_name, box22_name, box23_name, box24_name, box25_name,
         box26_name, box27_name, box28_name, box29_name, box30_name,
         box31_name, box32_name, box33_name, box34_name, box35_name,
         box36_name, box37_name, box38_name, box39_name, box40_name,
         box41_name, box42_name, box43_name, box44_name, box45_name,
         box46_name, box47_name, box48_name, box49_name, box50_name,
         box51_name, box52_name, box53_name, box54_name, box55_name,
         box56_name, box57_name, box58_name, box59_name, box60_name
       FROM HSCS_COLOR_CALL_MONITORING
       ORDER BY DATE_TIME DESC
     `);

     const row = result.recordset[0];

 
     res.status(200).json(row);

   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Database error" });
   }
 });

 
 router.get("/hs_boxes_colors", async (req, res) => {
   try {
     const pool = await poolPromise;

     const result = await pool.request().query(`
       SELECT TOP 1
         box1_name, box2_name, box3_name, box4_name, box5_name,
         box6_name, box7_name, box8_name, box9_name, box10_name,
         box11_name, box12_name, box13_name, box14_name, box15_name,
         box16_name, box17_name, box18_name, box19_name, box20_name,
         box21_name, box22_name, box23_name, box24_name, box25_name,
         box26_name, box27_name, box28_name, box29_name, box30_name,
         box31_name, box32_name, box33_name, box34_name, box35_name,
         box36_name, box37_name, box38_name, box39_name, box40_name,
         box41_name, box42_name, box43_name, box44_name, box45_name,
         box46_name, box47_name, box48_name, box49_name, box50_name,
         box51_name, box52_name, box53_name, box54_name, box55_name,
         box56_name, box57_name, box58_name, box59_name, box60_name,
         box1_color, box2_color, box3_color, box4_color, box5_color,
         box6_color, box7_color, box8_color, box9_color, box10_color,
         box11_color, box12_color, box13_color, box14_color, box15_color,
         box16_color, box17_color, box18_color, box19_color, box20_color,
         box21_color, box22_color, box23_color, box24_color, box25_color,
         box26_color, box27_color, box28_color, box29_color, box30_color,
         box31_color, box32_color, box33_color, box34_color, box35_color,
         box36_color, box37_color, box38_color, box39_color, box40_color,
         box41_color, box42_color, box43_color, box44_color, box45_color,
         box46_color, box47_color, box48_color, box49_color, box50_color,
         box51_color, box52_color, box53_color, box54_color, box55_color,
         box56_color, box57_color, box58_color, box59_color, box60_color
       FROM HSCS_COLOR_CALL_MONITORING
       ORDER BY DATE_TIME DESC
     `);

     res.status(200).json(result.recordset[0]);

   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Database error" });
   }
 });

 router.get("/hs_yellow_count", async (req, res) => {
   try {
     const pool = await poolPromise;

     const result = await pool.request().query(`
       SELECT TOP 1
          box1_yellow_count,box2_yellow_count,box3_yellow_count,box4_yellow_count,box5_yellow_count,
     box6_yellow_count,box7_yellow_count,box8_yellow_count,box9_yellow_count,box10_yellow_count,
     box11_yellow_count,box12_yellow_count,box13_yellow_count,box14_yellow_count,box15_yellow_count,
     box16_yellow_count,box17_yellow_count,box18_yellow_count,box19_yellow_count,box20_yellow_count,
     box21_yellow_count,box22_yellow_count,box23_yellow_count,box24_yellow_count,box25_yellow_count,
     box26_yellow_count,box27_yellow_count,box28_yellow_count,box29_yellow_count,box30_yellow_count,
     box31_yellow_count,box32_yellow_count,box33_yellow_count,box34_yellow_count,box35_yellow_count,
     box36_yellow_count,box37_yellow_count,box38_yellow_count,box39_yellow_count,box40_yellow_count,
     box41_yellow_count,box42_yellow_count,box43_yellow_count,box44_yellow_count,box45_yellow_count,
     box46_yellow_count,box47_yellow_count,box48_yellow_count,box49_yellow_count,box50_yellow_count,
     box51_yellow_count,box52_yellow_count,box53_yellow_count,box54_yellow_count,box55_yellow_count,
     box56_yellow_count,box57_yellow_count,box58_yellow_count,box59_yellow_count,box60_yellow_count
       FROM HSCS_COLOR_CALL_MONITORING
       ORDER BY DATE_TIME DESC
     `);

     res.status(200).json(result.recordset[0]);

   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Database error" });
   }
 });

 router.get("/hs_yellow_time", async (req, res) => {
  try {
     const pool = await poolPromise;

     const result = await pool.request().query(`
       SELECT TOP 1
           box1_yellow_time,box2_yellow_time,box3_yellow_time,box4_yellow_time,box5_yellow_time,box6_yellow_time,box7_yellow_time,box8_yellow_time,box9_yellow_time,box10_yellow_time,
     box11_yellow_time,box12_yellow_time,box13_yellow_time,box14_yellow_time,box15_yellow_time,box16_yellow_time,box17_yellow_time,box18_yellow_time,box19_yellow_time,box20_yellow_time,
     box21_yellow_time,box22_yellow_time,box23_yellow_time,box24_yellow_time,box25_yellow_time,box26_yellow_time,box27_yellow_time,box28_yellow_time,box29_yellow_time,box30_yellow_time,
     box31_yellow_time,box32_yellow_time,box33_yellow_time,box34_yellow_time,box35_yellow_time,box36_yellow_time,box37_yellow_time,box38_yellow_time,box39_yellow_time,box40_yellow_time,
     box41_yellow_time,box42_yellow_time,box43_yellow_time,box44_yellow_time,box45_yellow_time,box46_yellow_time,box47_yellow_time,box48_yellow_time,box49_yellow_time,box50_yellow_time,
     box51_yellow_time,box52_yellow_time,box53_yellow_time,box54_yellow_time,box55_yellow_time,box56_yellow_time,box57_yellow_time,box58_yellow_time,box59_yellow_time,box60_yellow_time
       FROM HSCS_COLOR_CALL_MONITORING
       ORDER BY DATE_TIME DESC
     `);

     res.status(200).json(result.recordset[0]);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Database error" });
   }
 });


 module.exports = router;