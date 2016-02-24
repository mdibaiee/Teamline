export default ({
  Company, Employee, Role, Team, Project, Action, Goal, Break, WorkHour
  }) => {
  // Employee <--> Role
  Employee.belongsToMany(Role, { through: 'EmployeeRoles' });
  Role.belongsToMany(Employee, { through: 'EmployeeRoles' });

  // Team <--> Role
  Team.belongsToMany(Role, { through: 'TeamRoles' });
  Role.belongsToMany(Team, { through: 'TeamRoles' });

  // Employee <--> Team
  Employee.belongsToMany(Team, { through: 'EmployeeTeams' });
  Team.belongsToMany(Employee, { through: 'EmployeeTeams' });

  // Employee <--> Project
  Employee.belongsToMany(Project, { through: 'EmployeeProjects' });
  Project.belongsToMany(Employee, { through: 'EmployeeProjects' });

  Team.hasMany(Project);
  Project.belongsTo(Team);

  // Employee --> Break
  Employee.hasMany(Break);
  Break.belongsTo(Employee);

  // Company --> Team
  Company.hasMany(Team);
  Team.belongsTo(Company);

  // Team --> Goal
  Team.hasMany(Goal);
  Goal.belongsTo(Team);

  // Project --> Role
  Project.hasMany(Role);
  Role.belongsTo(Project);

  // Employee --> Action
  Employee.hasMany(Action);
  Action.belongsTo(Employee);

  // Role --> Action
  Role.hasMany(Action);
  Action.belongsTo(Role);

  // Project --> Action
  Project.hasMany(Action);
  Action.belongsTo(Project);

  // Employee --> WorkHour
  Employee.hasMany(WorkHour);
  WorkHour.belongsTo(Employee);
};
