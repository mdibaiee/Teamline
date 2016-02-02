module.exports = (sequelize, Types) =>
  sequelize.define('Role', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    purpose: {
      type: Types.STRING
    },
    accountability: {
      type: Types.STRING
    }
  });
