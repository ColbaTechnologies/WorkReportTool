/**
 * Created by fran on 20/12/17.
 */

import DataSource from "./dataSource";

function createNew(data) {
  return DataSource({
    url: "/record",
    method: "POST",
    data: data
  });
}
function getById(id) {
  return DataSource({
    url: `/record/${id}`,
    method: "GET"
  });
}
function getCurrent(workerId) {
  return DataSource({
    url: `/record/running/${workerId}`,
    method: "GET"
  });
}
function stop(id) {
  return DataSource({
    url: `/record/stop/${id}`,
    method: "PUT"
  });
}

function getEmployeeRecords(id) {
  return DataSource({
    url: `/record/employee/${id}`,
    method: "GET"
  });
}

function getEmployeeTodayRecords(id) {
  return DataSource({
    url: `/record/employee/today/${id}`,
    method: "GET"
  });
}

const RecordService = {
  createNew,
  getById,
  getCurrent,
  stop,
  getEmployeeRecords,
  getEmployeeTodayRecords
};

export default RecordService;
