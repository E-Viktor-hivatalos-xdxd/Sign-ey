//Imports
const { Router } = require("express");

//Router
const router = Router();

router.use((req, res, next) => {
  if (req?.group?.name) {
    next();
  } else {
    res.status(401).send({ status: "Unauthorized" });
  }

  return req.group;
});

module.exports = router;
