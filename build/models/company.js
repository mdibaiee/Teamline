'use strict';

module.exports = function (sequelize, Types) {
  return sequelize.define('Company', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  });
};
