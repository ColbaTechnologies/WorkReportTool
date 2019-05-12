import moment from "moment";
export const getDiffTime = (creationDate, evaluableDate) => {
  var totalSec = evaluableDate.diff(creationDate, "seconds");
  let result = moment()
    .startOf("day")
    .seconds(totalSec)
    .format("HH:mm:ss");

  return result;
};
