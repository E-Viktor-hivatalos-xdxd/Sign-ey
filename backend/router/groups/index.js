const { Router } = require("express");
const { Group, User } = require("../../schema");
const yup = require("yup");


const router = Router();

const groupTemplate = yup.object().shape({
  name: yup.string().min(5, "A megadott név nem elég hosszú!").max(30, "A megadott név túl hosszú!").required("A név megadása kötelező"),
  permission: yup.number().min(0, "A jogosultság kisebb mint 0").max(9, "A jogosultság nem lehet nagyobb mint 9"),
  enterTimeRange: yup.string().min(4, "A enterTimeRange nem elég hosszú!").max(16, "A enterTimeRange túl hosszú!").required("A enterTimeRange megadása kötelező"),
  exitTimeRange: yup.string().min(4, "A exitTimeRange nem elég hosszú!").max(16, "A exitTimeRange túl hosszú!").required("A exitTimeRange megadása kötelező"),
});

const check = async (req, res, next) => {
  try {
    await groupTemplate.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post("/", require("../../middleware/user"), check, async (req, res) => {
  const { name, permission, enterTimeRange, exitTimeRange } = req.body;

  const group = await Group.create({
    name: name,
    permission: permission,
    enterTimeRange: enterTimeRange,
    exitTimeRange: exitTimeRange

  });

  if (group) {
    return res.status(200).send({ status: "Letrehozva" });
  } else {
    return res.status(400).send({ status: "error" });
  }

})


router.get("/", require("../../middleware/user"), async (req, res) => {
  const groups = await Group.findAll({
  });

  return res.send(groups.map(g => {
    const group = {
      groupID: g.groupID,
      name: g.name,
      permission: g.permission,
      enterTimeRange: g.enterTimeRange,
      exitTimeRange: g.exitTimeRange
    }
    return group
  }))
});

router.get("/:groupID", require("../../middleware/user"), async (req, res) => { /* FELHASZNÁLŐ LEKÉRDEZÉSE ID ALAPJÁN */
  const groupIDparam = req.params.groupID
  const group = await Group.findOne({
    where: {
      groupID: groupIDparam
    },
  });
  if (!group) return res.status(404).send({ error: "Csoport nem létezik" })
  return res.send(group)
})



router.delete("/:groupID", require("../../middleware/user"), async (req, res) => { /* CSOPORT TÖRLÉSE ID ALAPJÁN */
  const groupIDparam = req.params.groupID
  const group = await Group.findOne({
    where: {
      groupID: groupIDparam
    },
  });
  if (!group) return res.status(404).send("Csoport nem létezik")


  group.destroy().then(() => {
    return res.send({ status: "Törölve" })
  })
})

router.put("/:groupID", require("../../middleware/user"), async (req, res) => {  /* CSOPORT FRISSÍTÉSE */
  const groupIDparam = req.params.groupID
  const { name, permission, enterTimeRange, exitTimeRange } = req.body;
  const group = await Group.findOne({
    where: {
      groupID: groupIDparam
    },

  });

  if (!group) return res.send({ status: "Nem található" })

  if (name != undefined) {
    group.name = name
  }

  if (permission != undefined) {
    group.permission = permission

  }

  if (enterTimeRange != undefined) {
    group.enterTimeRange = enterTimeRange
  }

  if (exitTimeRange != undefined) {
    group.exitTimeRange = exitTimeRange
  }



  group.save().then(() => {
    return res.send({ status: "Frissítve" })


  });

  router.post("/:groupID", require("../../middleware/user"), async (req, res) => {  /* FELHASZNÁLÓ HOZZÁRENDEKÉSE A GROUPHOZ */
    const groupIDparam = req.params.groupID
    const { targetuserID } = req.body;
    const group = await Group.findOne({
      where: {
        groupID: groupIDparam
      },

    });

    if (!group) return res.status(404).send({ error: "Csoport nem létezik" })

    const user = await User.findOne({
      where: {
        userID: targetuserID
      },
    });
    if (!user) return res.status(404).send({ error: "Felhasználó nem létezik" })


  });

});

module.exports = router;