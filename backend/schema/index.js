const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  sync: true,
});

const User = require("./User")(sequelize);
const Log = require("./Log")(sequelize);
const Group = require("./Group")(sequelize);

Group.hasMany(User, { foreignKey: "groupID"});
User.belongsTo(Group, {foreignKey: "groupID", onDelete: "SET NULL"});

User.hasMany(Log, { foreignKey: "userID"});
Log.belongsTo(User, { foreignKey: "userID"});

// One-to-Many between User and Rental
/* User.hasMany(Rental, { foreignKey: "userID" });
Rental.belongsTo(User, { foreignKey: "userID" }); */

module.exports = {
  sequelize,
  User,
  Log,
  Group,
};
