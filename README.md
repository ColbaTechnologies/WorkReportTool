[![Build Status](https://travis-ci.com/ColbaTechnologies/QA-Dashboard.svg?branch=master)](https://travis-ci.com/ColbaTechnologies/QA-Dashboard)

# QA-Dashboard

Is a open source project to mantein the quality assurance process in software projects. The idea of this is be able to syncronize the development and the QA results, estandarized in diferent structures to be present to the testers, to the definition team or the developers.

# Install manualy

- Clone the project
- Run up the Api

```bash
    cd API
    npm install
    npm run dev
```

- Run the WebApp

```bash
    cd WebApp
    npm install
```

- Run the development mode

```bash
    npm start
```

- Create a build

```bash
    npm run build
```

# Install with docker-compose

1. Create Docker-compose.yml file with the bellow content in an empty folder

```yaml
version: "3"
services:
  webapp:
    container_name: qa_webapp
    image: xenteclb/qa-dashboard-webapp:1.0
    ports:
      - "3000:3000"
  api:
    container_name: qa_api
    image: xenteclb/qa-dashboard-api:1.0
    ports:
      - "5000:5000"
    depends_on:
      - mongo
  mongoex:
    image: mongo-express
    environment:
      - ME_CONFIG_OPTIONS_EDITORTHEME=ambiance
      - ME_CONFIG_MONGODB_SERVER=mongo
      - ME_CONFIG_MONGODB_PORT=27017
      - ME_CONFIG_MONGODB_ENABLE_ADMIN=true
    ports:
      - "8081:8081"
    depends_on:
      - mongo
  mongo:
    container_name: mongo
    image: mongo
    restart: always
    environment:
      - MONGO_INITDB_DATABASE=qaDashboard
    volumes:
      - mongodata:/data_docker/db
    ports:
      - "27017:27017"
volumes: mongodata:
```

2. Run docker-compose up
3. Test in your browser using http://localhost:3000 url

# How start after install?

In your localhost you will have your first dashboard, the Projects View, here you can create your first project. On your menu will appear the project with two sections, "Test Definitions" and "Test Executions".

## Concepts

1. Project
2. Test Suites
3. Test Cases
4. Test Executions
5. Release Packages

## Test Definition section

Clicking on this section or directly on the proyect you will go to the Project Detail on the definition mode, here you can create the first test suite, and after that you can create your first test case.

1. Now we have a screen in with two columns, on the left, the test suit column with all the test suites of the project, and a badge with (test cases passesd/total test cases), besides clicking on a test suite, on the right will appear the test cases column, with all the test cases of a suite, in both columns you can filter with the searcher on the top.
2. In each test case item you have few icons and posibilities:
   - Delete the test case with the paper box icon.
   - Edit the test case definition with the pen icon, if you save the changes of the definition the version of this test case will be upgrade.
   - Click on the item you will be redirecting to the read view of the test case.
   - Each item will change the colour based on the last test execution status.

## Test Execution section

Clicking on this section you will go to the Project Detail on the execution mode, the diference between that and the definition mode is the posibilities that as a user you have.

1. You have the same columns with the same basic behaviour but diferent icon actions
2. In each test case item you have few icons and posibilities:
   - Run a test execution with the check icon.
   - Go to the historic of executions of this test case with the list icon, in this list each execution has a url icon to copy the direction to share with a developer if is needed to be corrected or others.
   - Click on the item you will be redirecting to the read view of the test case.

## Create a release package

Now you can have your team working and defining the test cases and checking it. Before a release you can create a release package that will save as a separated structure on your data base all the definitions of each test suites and test cases inside of a project.
To get this package generated you need to have all the test cases in status passed, if not an alert will be shown.

## The Whole Cycle

Now you can start to define test suites with test cases and share with the team the results of that, preventing bugs and adding quality to the product being reported each release and mantaining the development and QA processes together.
