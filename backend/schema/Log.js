const { DataTypes, Model, Sequelize } = require("sequelize");


class Log extends Model {
}

module.exports = function (sequelize) {
  return Log.init(
    {
      logID: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
      },

      userID: {
        type: DataTypes.INTEGER,
      },

      entryTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      exitTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      action: {
        type: DataTypes.STRING,
        allowNull: true,
      }

    },{

    sequelize,
      modelName: "Log",
      timestamps: false,


    }
  );
};
