module.exports = (sequelize, Types) =>
  sequelize.define('Vacation', {
    from: {
      type: Types.DATE,
      defaultValue: Types.NOW
    },
    to: {
      type: Types.DATE,
      allowNull: false
    }
  }, {
    instanceMethods: {
      timeLeft() {
        return new Date(this.to - this.from);
      }
    },
    scopes: {
      active: {
        where: {
          from: {
            $lt: sequelize.fn('NOW')
          },
          to: {
            $gt: sequelize.fn('NOW')
          }
        }
      }
    }
  });
