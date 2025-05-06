//Imports
const { Router } = require("express");
require("dotenv").config();

//Router
const router = Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/logs", require("./logs"));
router.use("/users", require("./users"));
router.use("/group", require("./group"));
router.use("/groups", require("./groups"));
router.use("/door", require("./door"));



module.exports = router;
