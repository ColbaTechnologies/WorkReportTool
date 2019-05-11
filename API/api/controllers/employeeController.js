"use strict";

const mongoose = require("mongoose"),
  Employee = mongoose.model("Employee");

exports.get_employee_by_id = (req, res) => {
  Employee.find({ _id: req.params._id }, function(err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};

exports.create_employee = (req, res) => {
  let new_Employee = new Employee(req.body);
  new_Employee.save((err, employee) => {
    if (err) res.send(err);
    res.json(employee);
  });
};
