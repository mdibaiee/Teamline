'use strict';

module.exports = function (sequelize, Types) {
  return sequelize.define('Action', {
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
      },
      today: {
        where: {
          date: {
            $gt: sequelize.fn('CURDATE'),
            $lt: sequelize.fn('DATE_ADD', sequelize.fn('CURDATE'), sequelize.literal('INTERVAL 1 DAY'))
          }
        }
      },
      past: {
        where: {
          date: {
            $lt: sequelize.fn('CURDATE')
          }
        }
      },
      future: {
        where: {
          date: {
            $gt: sequelize.fn('DATE_ADD', sequelize.fn('CURDATE'), sequelize.literal('INTERVAL 1 DAY'))
          }
        }
      }
    }
  });
};
