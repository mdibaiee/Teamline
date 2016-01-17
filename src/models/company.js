module.exports = (sequelize, Types) => {
  return sequelize.define('Company', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  })
}
