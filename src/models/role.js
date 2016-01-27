module.exports = (sequelize, Types) =>
  sequelize.define('Role', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  });
