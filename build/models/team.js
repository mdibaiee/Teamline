'use strict';

module.exports = function (sequelize, Types) {
  return sequelize.define('Team', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  });
};
