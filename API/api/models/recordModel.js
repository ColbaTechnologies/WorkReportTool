"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  employeeId: String,
  employeeName: String,
  running: Boolean,
  companyId: String,
  createdAt: Date,
  stoppedAt: Date,
  status: { type: String, enum: ["accepted", "cancelled", "pending"] }
});

module.exports = mongoose.model("Record", RecordSchema);
