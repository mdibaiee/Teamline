module.exports = (sequelize, Types) =>
  sequelize.define('ScheduleModification', {
    type: {
      type: Types.ENUM('sub', 'add'), // eslint-disable-line
      allowNull: false
    },
    reason: {
      type: Types.STRING
    },
    start: {
      type: Types.DATE,
      defaultValue: Types.NOW
    },
    end: {
      type: Types.DATE,
      allowNull: false
    },
    status: {
      type: Types.ENUM('pending', 'accepted', 'rejected'), // eslint-disable-line
      defaultValue: 'pending'
    }
  }, {
    instanceMethods: {
      duration() {
        return new Date(this.end - this.start);
      }
    },
    scopes: {
      active: {
        where: {
          start: {
            $lt: sequelize.fn('NOW')
          },
          end: {
            $gt: sequelize.fn('NOW')
          }
        }
      },
      pending: {
        where: {
          status: 'pending'
        }
      },
      accepted: {
        where: {
          status: 'accepted'
        }
      },
      rejected: {
        where: {
          status: 'rejected'
        }
      },
      add: {
        where: {
          type: 'add'
        }
      },
      sub: {
        where: {
          type: 'sub'
        }
      }
    }
  });
