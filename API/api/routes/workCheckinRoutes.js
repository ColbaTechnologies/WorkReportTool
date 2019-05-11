"use strict";
module.exports = function(app) {
  const company = require("../controllers/companyController");
  const employee = require("../controllers/employeeController");
  const record = require("../controllers/recordController");

  //Company routes
  app.route("/company").post(company.create_a_company);
  app.route("/company/:_id").get(company.find_company_by_id);
  app.route("/company/code/:code").get(company.find_company_by_code);

  //Employee routes
  app.route("/employee").post(employee.create_employee);
  app.route("/employee/:_id").get(employee.get_employee_by_id);

  //Record routes
  app.route("/record").post(record.create_record);
  app
    .route("/record/pending/company/:_id")
    .get(record.get_pending_records_by_company_id);
  app.route("/record/employee/:_id").get(record.get_record_by_employee_id);
  app.route("/record/stop/:_id").put(record.stop_record);
  app.route("/record/validate/").put(record.validate_records);
};
