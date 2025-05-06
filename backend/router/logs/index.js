//Imports
const { Router } = require("express");
const { User, Log, sequelize } = require("../../schema");
const { Op } = require("sequelize");

const router = Router();
//TODO: fix for new DB
router.get("/", require("../../middleware/user"), async (req, res) => {
  const { userID, groupID, manual, fromDate, toDate } = req.body;

  const logs = await Log.findAll({
    where: {
      ...userID != undefined && {
        userID: userID
      },
      ...manual != undefined && {
        userID: null
      },
      ...fromDate != undefined && {
        entryTime: {
          [Op.gte]: new Date(fromDate)
        },
        exitTime: {
          [Op.gte]: new Date(fromDate)
        }
      },
      ...toDate != undefined && {
        entryTime: {
          [Op.lte]: new Date(toDate)
        },
        exitTime: {
          [Op.lte]: new Date(toDate)
        }
      }
    },


    limit: 25,
    include: [
      {
        model: User,
        attributes: ["groupID", "name", "email", "cardNumber"],
        ...groupID != undefined && {
          where: {
            groupID: groupID
          }
        }
      },
    ],
  });

  return res.send(logs.sort((a, b) => b?.logID - a?.logID))
});

module.exports = router; 
