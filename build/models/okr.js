'use strict';

module.exports = function (sequelize, Types) {
  return sequelize.define('OKR', {
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
};
