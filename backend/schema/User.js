const { DataTypes, Model, Sequelize, INTEGER } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  createPassword(password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
    this.save();
  }
}


module.exports = function (sequelize) {
  return User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
            },

      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      groupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      cardNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,

      },
      
    },

    {
      sequelize,
      modelName: "User",
      timestamps: false,   
     }
  );
};
