module.exports = function(sequelize, Types) {
  return sequelize.define('Employee', {
    firstname: {
      type: Types.STRING,
      allowNull: false
    },
    lastname: {
      type: Types.STRING,
      allowNull: false
    },
    email: {
      type: Types.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Types.STRING,
      allowNull: false
    },
    bio: {
      type: Types.STRING
    },
    birthday: Types.DATE,
    joinDate: Types.DATE,
    phone: {
      type: Types.STRING
    },
    github: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    },
    twitter: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    },
    facebook: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    },
    googleplus: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    },
    linkedin: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    },
    dribbble: {
      type: Types.STRING,
      validate: {
        isUrl: true
      }
    }
  });
}
