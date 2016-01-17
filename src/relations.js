export default ({ Company, Employee, Role, Team, OKR, Project, Action, Goal, Vacation }) => {
  // Employee <--> Role
  Employee.belongsToMany(Role, { through: 'EmployeeRoles' });
  Role.belongsToMany(Employee, { through: 'EmployeeRoles' });

  // Employee <--> Team
  Employee.belongsToMany(Team, { through: 'EmployeeTeams' });
  Team.belongsToMany(Employee, { through: 'EmployeeTeams' });

  // Employee --> Vacation
  Employee.hasMany(Vacation);
  Vacation.belongsTo(Employee);

  // Role <--> Team
  Role.belongsToMany(Team, { through: 'RoleTeams' });
  Team.belongsToMany(Role, { through: 'RoleTeams' });

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
}
