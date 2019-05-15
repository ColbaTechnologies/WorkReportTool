"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: String,
  surname: String,
  nif: String,
  nass: String,
  companyId: String,
  isAdmin: Boolean,
  username: String
});

module.exports = mongoose.model("Employee", EmployeeSchema);
