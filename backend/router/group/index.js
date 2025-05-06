//Imports
const { Router } = require("express");
const { Group } = require("../../schema");

const router = Router();
//TODO: fix for new DB
router.get("/", require("../../middleware/group"), async (req, res) => {
  const group = await Group.findOne({
    where: {
      groupID: req?.group?.groupID,
    },
  });

  const { groupID, name, permission, timeRange } = group;
  return res.send({
    groupID,
    name,
    permission,
    timeRange,
  });
});

module.exports = router;