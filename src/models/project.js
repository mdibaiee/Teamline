module.exports = (sequelize, Types) =>
  sequelize.define('Project', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    description: {
      type: Types.STRING
    },
    done: {
      type: Types.BOOLEAN,
      defaultValue: false
    },
    date: {
      type: Types.DATE,
      defaultValue: Types.NOW
    }
  }, {
    scopes: {
      done: {
        where: {
          done: true
        }
      },
      undone: {
        where: {
          done: false
        }
      }
    }
  });
