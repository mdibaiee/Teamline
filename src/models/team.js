module.exports = (sequelize, Types) => {
  return sequelize.define('Team', {
    name: {
      type: Types.STRING,
      allowNull: false
    }
  })
}
