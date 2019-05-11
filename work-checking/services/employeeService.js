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

const EmployeeService = {
  createNew
};

export default EmployeeService;
