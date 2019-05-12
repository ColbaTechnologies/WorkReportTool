"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  employeeId: String,
  employeeName: String,
  running: Boolean,
  companyId: String,
  createdAt: String,
  stoppedAt: String,
  status: { type: String, enum: ["accepted", "cancelled", "pending"] }
});

module.exports = mongoose.model("Record", RecordSchema);
