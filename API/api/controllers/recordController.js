"use strict";
const moment = require("moment");
const mongoose = require("mongoose"),
  Record = mongoose.model("Record");

exports.get_record_by_employee_id = (req, res) => {
  Record.find({ employeeId: req.params._id }, function(err, record) {
    if (err) res.send(err);
    const rec = prepareRecords(record);
    res.json(rec);
  });
};

exports.get_records_today = (req, res) => {
  const today = moment().startOf("day");
  Record.find(
    {
      employeeId: req.params._id,
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today)
          .endOf("day")
          .toDate()
      }
    },
    function(err, record) {
      if (err) res.send(err);
      const rec = prepareRecords(record);
      res.json(rec);
    }
  );
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
  console.log("dwadwadwadad");
  var criteria = {
    employeeId: req.body.employeeId,
    createdAt: {
      $gte: moment(req.body.date)
        .startOf("day")
        .toDate(),
      $lte: moment(req.body.date)
        .endOf("day")
        .toDate()
    }
  };
  console.log(criteria);
  Record.updateMany(
    criteria,
    { status: req.body.status },
    { multi: true },
    function(err, record) {
      if (err) res.send(err);
      res.json(record);
    }
  );
};

const prepareRecords = records => {
  let sortedArray = records
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .map(record => {
      let created = moment(record.createdAt);
      let stopped = moment(record.stoppedAt);
      record.cDate = created.format("DD/MM/YY");
      record.cTime = created.format("hh:mm:ss");
      record.sDate = stopped.format("DD/MM/YY");
      record.sTime = stopped.format("hh:mm:ss");
      record.difference = getDiffTime(created, stopped);
      return record;
    });
  let recordsGrouped = groupBy(sortedArray, "cDate");
  let recordsFinal = [];
  Object.keys(recordsGrouped).map(day => {
    let data = { day: day, records: recordsGrouped[day], total: 0 };
    recordsGrouped[day].map(item => {
      data.total += moment.duration(item.difference).asSeconds();
    });
    data.total = moment(data.total)
      .startOf("day")
      .seconds(data.total)
      .format("HH:mm:ss");
    recordsFinal.push(data);
  });

  return recordsFinal;
};

const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
const getDiffTime = (creationDate, evaluableDate) => {
  var totalSec = evaluableDate.diff(creationDate, "seconds");
  let result = moment()
    .startOf("day")
    .seconds(totalSec)
    .format("HH:mm:ss");

  return result;
};
