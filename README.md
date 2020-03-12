
# UofT Full-Stack Web Development Bootcamp Project #10: Employee Tracker

A CLI application for managing a company's employees using node, inquirer, and MySQL.

## Table of Contents

- [UofT Full-Stack Web Development Bootcamp Project #10: Employee Tracker](#uoft-full-stack-web-development-bootcamp-project-10-employee-tracker)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Business Context](#business-context)
  - [Minimum Requirements](#minimum-requirements)
  - [Bonus](#bonus)
  - [Development Strategy](#development-strategy)
  - [Built With](#built-with)
  - [Submission](#submission)

## About

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. This Node.js CLI application is developed to be a solution for managing a company's employees using node, inquirer, and MySQL.

![](screenSho.gif)

## Business Context

Following the common templates for user stories, this challenge can be framed as follows for various stakeholders:

As a Business Owner, Manager and/or HR Personnel:

```
I want to be able to view and manage the departments, roles, and employees in my company

So that I can organize and plan my business.
```

```
I want to tbe able to:

  Add departments, roles, employees

  View departments, roles, employees

  Update employee roles

and also:

  Update employee managers

  View employees by manager

  Delete departments, roles, and employees

  View the total utilized budget of a department -- ie the combined salaries of all employees in that department
```

## Minimum Requirements

- Functional application.

- GitHub repository with a unique name and a README describing the project.

- The command-line application should allow users to:

  - Add departments, roles, employees

  - View departments, roles, employees

  - Update employee roles

## Bonus

- The command-line application should allow users to:

  - Update employee managers

  - View employees by manager

  - Delete departments, roles, and employees

  - View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Development Strategy

1. Include a `seed.js` file to pre-populate database.

2. Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

3. Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

4. Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better.

5. Final application should look like the example below:


## Built With

- [Node.js](https://nodejs.org/en/docs/) -- JavaScript runtime
- [Inquirer](https://www.npmjs.com/package/inquirer) -- Interactive CLI


## Submission

You are required to submit the following:

- An animated GIF demonstrating the app functionality

- The URL of the GitHub repository