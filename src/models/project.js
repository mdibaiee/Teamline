module.exports = (sequelize, Types) =>
  sequelize.define('Project', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    description: {
      type: Types.STRING
    },
    state: {
      type: Types.ENUM('todo', 'doing', 'done'), // eslint-disable-line
      defaultValue: 'todo'
    },
    date: {
      type: Types.DATE,
      defaultValue: Types.NOW
    }
  }, {
    scopes: {
      done: {
        where: {
          state: 'done'
        }
      },
      doing: {
        where: {
          state: 'doing'
        }
      },
      todo: {
        where: {
          state: 'todo'
        }
      },
      undone: {
        where: {
          state: {
            $ne: 'done'
          }
        }
      }
    }
  });
