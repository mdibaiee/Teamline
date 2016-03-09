export default ({
  Company, Employee, Role, Team, Project, Action, Goal, ScheduleModification, WorkHour, Timerange
  }) => {
  // Employee <--> Role
  Employee.belongsToMany(Role, { through: 'EmployeeRoles' });
  Role.belongsToMany(Employee, { through: 'EmployeeRoles' });

  // Team <--> Role
  Team.belongsToMany(Role, { through: 'TeamRoles' });
  Role.belongsToMany(Team, { through: 'TeamRoles' });

  // Employee <--> Team
  Employee.belongsToMany(Team, { through: 'EmployeeTeams', as: 'Teams' });
  Team.belongsToMany(Employee, { through: 'EmployeeTeams', as: 'Employees' });

  // Employee (Admin) <--> Team
  Employee.belongsToMany(Team, { through: 'TeamAdmins', as: 'ManagedTeams', foreignKey: 'ManagerId' }); // eslint-disable-line
  Team.belongsToMany(Employee, { through: 'TeamAdmins', as: 'Managers', foreignKey: 'TeamId' });

  // Employee <--> Project
  Employee.belongsToMany(Project, { through: 'EmployeeProjects' });
  Project.belongsToMany(Employee, { through: 'EmployeeProjects' });

  Team.hasMany(Project);
  Project.belongsTo(Team);

  // Employee --> ScheduleModification
  Employee.hasMany(ScheduleModification);
  ScheduleModification.belongsTo(Employee);

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

  // WorkHour --> Timerange
  WorkHour.hasMany(Timerange);
  Timerange.belongsTo(WorkHour);
};
