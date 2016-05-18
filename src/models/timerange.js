module.exports = (sequelize, Types) =>
  sequelize.define('Timerange', {
    start: {
      type: Types.TIME,
      allowNull: false,
    },
    end: {
      type: Types.TIME,
      allowNull: false,
    },
  });
