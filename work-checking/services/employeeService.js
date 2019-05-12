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
function getById(id) {
  return DataSource({
    url: `/employee/${id}`,
    method: "GET"
  });
}

const EmployeeService = {
  createNew,
  getById
};

export default EmployeeService;
