module.exports = (sequelize, Types) =>
  sequelize.define('Team', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  });
