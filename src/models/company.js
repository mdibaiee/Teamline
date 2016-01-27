module.exports = (sequelize, Types) =>
  sequelize.define('Company', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  });
