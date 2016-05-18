module.exports = (sequelize, Types) =>
  sequelize.define('Goal', {
    name: {
      type: Types.STRING,
      allowNull: false,
    },
    description: {
      type: Types.STRING,
    },
    done: {
      type: Types.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: Types.DATE,
      defaultValue: Types.NOW,
    },
    deadline: {
      type: Types.DATE,
    },
  }, {
    scopes: {
      done: {
        where: {
          done: true,
        },
      },
      undone: {
        where: {
          done: false,
        },
      },
      deadline_reached: {
        where: {
          deadline: {
            $lt: sequelize.fn('NOW'),
          },
        },
      },
      deadline_not_reached: {
        where: {
          deadline: {
            $gt: sequelize.fn('NOW'),
          },
        },
      },
    },
  });
