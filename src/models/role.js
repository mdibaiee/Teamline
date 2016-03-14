module.exports = (sequelize, Types) =>
  sequelize.define('Role', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    description: {
      type: Types.STRING
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
