'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (_ref) {
  var Company = _ref.Company;
  var Employee = _ref.Employee;
  var Role = _ref.Role;
  var Team = _ref.Team;
  var OKR = _ref.OKR;
  var Project = _ref.Project;
  var Action = _ref.Action;
  var Goal = _ref.Goal;
  var Vacation = _ref.Vacation;

  // Employee <--> Role
  Employee.belongsToMany(Role, { through: 'EmployeeRoles' });
  Role.belongsToMany(Employee, { through: 'EmployeeRoles' });

  // Employee <--> Team
  Employee.belongsToMany(Team, { through: 'EmployeeTeams' });
  Team.belongsToMany(Employee, { through: 'EmployeeTeams' });

  // Employee --> Vacation
  Employee.hasMany(Vacation);
  Vacation.belongsTo(Employee);

  // Team --> Role
  Team.hasMany(Role);
  Role.belongsTo(Team);

  // OKR --> OKR
  // Sub-OKR of teams
  OKR.hasMany(OKR);
  OKR.belongsTo(OKR);

  // OKR --> Project
  OKR.hasMany(Project);
  Project.belongsTo(OKR);

  // Project --> Action
  Project.hasMany(Action);
  Action.belongsTo(Project);

  // Company --> Team
  Company.hasMany(Team);
  Team.belongsTo(Company);

  // Company --> OKR
  Company.hasMany(OKR);
  OKR.belongsTo(Company);

  // Team --> OKR (Sub-OKR)
  Team.hasMany(OKR);
  OKR.belongsTo(Team);

  // Team --> Goal
  Team.hasMany(Goal);
  Goal.belongsTo(Team);

  // Role --> Project
  Role.hasMany(Project);
  Project.belongsTo(Role);

  // Employee --> Action
  Employee.hasMany(Action);
  Action.belongsTo(Employee);
};

module.exports = exports['default'];
