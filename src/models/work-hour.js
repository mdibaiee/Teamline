module.exports = (sequelize, Types) =>
  sequelize.define('WorkHour', {
    weekday: {
      type: Types.INTEGER,
      min: 0,
      max: 6,
      allowNull: false
    }
  });
