module.exports = (sequelize, Types) =>
  sequelize.define('Break', {
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
      timeLeft() {
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
      }
    }
  });
