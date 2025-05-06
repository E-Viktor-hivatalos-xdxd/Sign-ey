const { DataTypes, Model, Sequelize } = require("sequelize");


class Group extends Model {
}

module.exports = function (sequelize) {
  return Group.init(
    {
      groupID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },

      permission: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },

      enterTimeRange: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      
      exitTimeRange: {
        type: DataTypes.STRING(25),
        allowNull: false,
      }
      

    },{

    sequelize,
      modelName: "Group",
      timestamps: false,

    }
  );
};
