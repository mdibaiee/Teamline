module.exports = (sequelize, Types) =>
  sequelize.define('Team', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    closed: {
      type: Types.BOOLEAN,
      defaultValue: false
    }
  }, {
    scopes: {
      open: {
        where: {
          closed: false
        }
      },
      closed: {
        where: {
          closed: true
        }
      }
    }
  });
