"use strict";

const mongoose = require("mongoose"),
  Company = mongoose.model("Company");

exports.find_company_by_id = (req, res) => {
  Company.find({ _id: req.params._id }, function(err, company) {
    if (err) res.send(err);
    res.json(company);
  });
};

exports.find_company_by_code = (req, res) => {
  Company.find({ code: req.params.code }, function(err, company) {
    if (err) res.send(err);
    res.json(company);
  });
};

exports.create_a_company = (req, res) => {
  let new_Company = new Company(req.body);
  new_Company.code = makeid(6);
  new_Company.save((err, company) => {
    if (err) res.send(err);
    res.json(company);
  });
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
