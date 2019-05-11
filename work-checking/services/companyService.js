/**
 * Created by fran on 20/12/17.
 */

import DataSource from "./dataSource";

function createNew(data) {
  return DataSource({
    url: "/company",
    method: "POST",
    data: data
  });
}

function getByCode(code) {
  return DataSource({
    url: `/company/code/${code}`,
    method: "GET"
  });
}

const CompanyService = {
  createNew,
  getByCode
};

export default CompanyService;
