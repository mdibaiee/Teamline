module.exports = (sequelize, Types) => {
  return sequelize.define('Role', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  })
}
