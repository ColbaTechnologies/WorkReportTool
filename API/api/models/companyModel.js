"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  code: String,
  cif: String,
  ccc: String
});

module.exports = mongoose.model("Company", CompanySchema);
