"use strict";

const mongoose = require("mongoose"),
  Record = mongoose.model("Record");

exports.get_record_by_employee_id = (req, res) => {
  Record.find({ employeeId: req.params._id }, function(err, record) {
    if (err) res.send(err);
    res.json(record);
  });
};

exports.get_active_record_of_employee = (req, res) => {
  Record.find({ employeeId: req.params._id, running: true }, function(
    err,
    record
  ) {
    if (err) res.send(err);
    res.json(record);
  });
};

exports.get_pending_records_by_company_id = (req, res) => {
  Record.find({ companyId: req.params._id, status: "pending" }, function(
    err,
    records
  ) {
    if (err) res.send(err);
    res.json(records);
  });
};

exports.create_record = (req, res) => {
  let new_Record = new Record(req.body);
  new_Record.status = "pending";
  new_Record.createdAt = new Date();
  new_Record.running = true;
  new_Record.save((err, record) => {
    if (err) res.send(err);
    res.json(record);
  });
};

exports.stop_record = (req, res) => {
  Record.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { stoppedAt: new Date(), running: false } },
    { new: true },
    (err, record) => {
      if (err) res.send(err);
      res.json(record);
    }
  );
};

exports.validate_records = (req, res) => {
  let listToUpdate = req.body;
  let iterationsNeeded = Object.keys(req.body).length;
  let iterations = 0;
  Object.entries(req.body).forEach(([key, value]) => {
    var criteria = {
      _id: { $in: value }
    };

    Record.update(criteria, { status: key }, { multi: true }, function(
      err,
      record
    ) {
      if (err) {
        res.send(err);
      } else {
        iterations++;
        if (iterations === iterationsNeeded) {
          res.send("ok");
        }
      }
    });
  });
};
