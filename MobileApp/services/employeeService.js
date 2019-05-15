/**
 * Created by fran on 20/12/17.
 */

import DataSource from "./dataSource";

function createNew(data) {
  return DataSource({
    url: "/employee",
    method: "POST",
    data: data
  });
}

function getByUserName(username) {
  return DataSource({
    url: `/employee/${username}`,
    method: "GET"
  });
}

const EmployeeService = {
  createNew,
  getByUserName
};

export default EmployeeService;
