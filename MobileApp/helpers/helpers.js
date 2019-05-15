import moment from "moment";
import { PAGES, COLORS } from "../constants";
export const getDiffTime = (creationDate, evaluableDate) => {
  var totalSec = evaluableDate.diff(creationDate, "seconds");
  let result = moment()
    .startOf("day")
    .seconds(totalSec)
    .format("HH:mm:ss");

  return result;
};

export const validate = (data, callback, fallback) => {
  let emptyInputs = Object.keys(data).filter(key => {
    if (data[key] === "") {
      return key;
    }
  });
  if (emptyInputs.length !== 0) {
    fallback(emptyInputs);
  } else {
    callback();
  }
};

export const prepareRecords = records => {
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

export const prepareRecordsForValidate = records => {
  let finalArray = [];
  records = records.map(record => {
    let created = moment(record.createdAt);
    let stopped = moment(record.stoppedAt);
    record.cDate = created.format("DD/MM/YY");
    record.difference = getDiffTime(created, stopped);
    return record;
  });

  let recordsGrouped = groupBy(records, "employeeId");
  Object.keys(recordsGrouped).forEach(employee => {
    recordsGrouped[employee] = groupBy(recordsGrouped[employee], "cDate");
    Object.keys(recordsGrouped[employee]).map(day => {
      let firstRegister = recordsGrouped[employee][day][0];
      let latestRegister = recordsGrouped[employee][day].reverse()[0];
      let total = 0;

      let totalToSend = 0;
      recordsGrouped[employee][day].map(item => {
        total += moment.duration(item.difference).asSeconds();
      });
      total = moment(total)
        .startOf("day")
        .seconds(total)
        .format("HH:mm:ss");

      let data = {
        day,
        firstRegister,
        employeeId: employee,
        employeeName: firstRegister.employeeName,
        start: moment(firstRegister.createdAt).format("HH:mm:ss"),
        end: moment(latestRegister.stoppedAt).format("HH:mm:ss"),
        total
      };
      finalArray.push(data);
    });
  });
  finalArray = groupBy(finalArray, "day");
  return finalArray;
};

export const getButtons = (screen, employee = null) => {
  let buttons = [];
  if (screen === PAGES.home) {
    buttons.push(
      {
        icon: "clock",
        text: "Today",
        color: COLORS.darkBlue,
        id: 0,
        targetPage: PAGES.today,
        params: { employeeId: employee._id }
      },
      {
        icon: "document",
        text: "Records",
        color: COLORS.lightGreen,
        id: 1,
        targetPage: PAGES.records,
        params: { employeeId: employee._id }
      }
    );
    if (employee.isAdmin) {
      buttons.push({
        icon: "checkmark",
        text: "Verify Records",
        color: COLORS.lightBlue,
        params: { companyId: employee.companyId },
        id: 2,
        targetPage: PAGES.validate
      });
    }
  }

  if (screen === PAGES.decision) {
    buttons = [
      {
        icon: "home",
        text: "Create a company",
        color: COLORS.darkGreen,
        id: 0,
        targetPage: PAGES.newCompany
      },
      {
        icon: "people",
        text: "Join on a company",
        color: COLORS.lightGreen,
        id: 1,
        targetPage: PAGES.join
      }
    ];
  }
  return buttons;
};
