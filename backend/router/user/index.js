//Imports
const { Router } = require("express");
const { User } = require("../../schema");

const router = Router();
//TODO: fix for new DB
router.get("/", require("../../middleware/user"), async (req, res) => {
  const user = await User.findOne({
    where: {
      userID: req?.user?.userID,
    },
  });

  const { userID, email, name, phone, groupID, cardNumber } = user;
  return res.send({
    userID,
    email,
    name,
    phone,
    groupID,
    cardNumber,
  });
});

module.exports = router;
