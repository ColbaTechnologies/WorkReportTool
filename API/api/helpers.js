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

export const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
export const getDiffTime = (creationDate, evaluableDate) => {
  var totalSec = evaluableDate.diff(creationDate, "seconds");
  let result = moment()
    .startOf("day")
    .seconds(totalSec)
    .format("HH:mm:ss");

  return result;
};
