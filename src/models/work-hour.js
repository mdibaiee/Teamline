module.exports = (sequelize, Types) =>
  sequelize.define('WorkHour', {
    weekday: {
      type: Types.ENUM('sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'), // eslint-disable-line
      allowNull: false
    },
    start: {
      type: Types.TIME,
      allowNull: false
    },
    end: {
      type: Types.TIME,
      allowNull: false
    }
  });