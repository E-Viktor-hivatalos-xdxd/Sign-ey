//Imports
const { Router } = require("express");
const { User, Log, Group } = require("../../schema");
const yup = require("yup")


const router = Router();
//TODO: fix for new DB
router.get("/", require("../../middleware/user"), async (req, res) => { /* ÖSSZES FELHASZNÁLÓ LEKÉRDEZÉSE */
  const users = await User.findAll({
    include: [
      {
        model: Group,
        attributes: ["name"]
      }
    ]
  });

  return res.send(users.map(u => {
    const user = {
      userID: u.userID,
      name: u.name,
      email: u.email,
      cardNumber: u.cardNumber,
      Group: {
        name: u?.Group?.name,
        groupID: u.groupID,

      }
    }
    return user
  }))

});

router.get("/:userID", require("../../middleware/user"), async (req, res) => { /* FELHASZNÁLŐ LEKÉRDEZÉSE ID ALAPJÁN */
  const userIDparam = req.params.userID
  const user = await User.findOne({
    where: {
      userID: userIDparam
    },
  });
  if (!user) return res.status(404).send("felhasználó nem létezik")

  const logs = await Log.findAll({
    where: {
      userID: userIDparam
    }
  })

  const { userID, email, name, phone, groupID, cardNumber } = user;
  return res.send({
    logs: logs,
    userID,
    email,
    name,
    phone,
    groupID,
    cardNumber,
  });
});

const userTemplate = yup.object().shape({
  email: yup.string().email().required("Az email megadása kötelező").min(5, "A megadott email nem elég hosszú!").max(30, "A megadott email túl hosszú!"),
  name: yup.string().min(5, "A megadott név nem elég hosszú!").max(30, "A megadott név túl hosszú!").required("A név megadása kötelező"),
  password: yup.string().min(5, "A megadott jelszó nem elég hosszú!").max(20, "A megadott jelszó túl hosszú!")
});

const check = async (req, res, next) => {
  try {
    await userTemplate.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post("/", require("../../middleware/user"), check, async (req, res) => { /* FELHASZNÁLÓ LÉTREHOZÁSA */
  const { email, name, password } = req.body;

  const [user, created] = await User.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      email: email,
      name: name,
    },
  });

  if (created) {
    user.createPassword(password)
    return res.status(200).send({ status: "Letrehozva" });
  } else {
    return res.status(400).send({ error: "Már létezik felhasználó ezzel az email címmel" });
  }
});

router.delete("/:userID", require("../../middleware/user"), async (req, res) => { /* FELHASZNÁLŐ TÖRLÉSE ID ALAPJÁN */
  const userIDparam = req.params.userID
  const user = await User.findOne({
    where: {
      userID: userIDparam
    },
  });
  if (!user) return res.status(404).send("felhasználó nem létezik")

  const users = await User.findAll({
    where: {
      userID: userIDparam
    }
  })
  user.destroy().then(() => {
    return res.send({ status: "Törölve" })
  })
})

router.put("/:userID", require("../../middleware/user"), async (req, res) => {  /* FELHASZNÁLÓ FRISSÍTÉSE */
  const userIDparam = req.params.userID
  const { email, password, name, phone } = req.body;
  const user = await User.findOne({
    where: {
      userID: userIDparam
    },
  });

  if (!user) return res.send({ status: "Nem található" })

  if (email != undefined) {
    user.email = email
  }

  if (password != undefined) {
    user.password = password

  }

  if (name != undefined) {
    user.name = name
  }

  if (phone != undefined) {
    user.phone = phone
  }



  user.save().then(() => {
    return res.send({ status: "Frissítve" })
  })
})

const { parser } = require("../../Serial")

router.post("/:userID/setCard", require("../../middleware/user"), async (req, res) => { /* KÁRTYA HOZZÁRENDELÉSE */
  const userIDparam = req.params.userID

  if (!userIDparam)
    return res.status(400).send({ error: "Hiányzó paraméterek" });


  req.setTimeout(15000, () => {
    return res.send({ error: "Hiba az olvasás során" })
  })
  parser?.once("data", async (data) => {
    const kod = data.replace("KOD:", "")
    const user = await User.findOne({
      where: {
        cardNumber: kod.replace("\r", "")
      },

    });

    if (user) return res.status(400).send({ error: "Ez a kártyaszám már foglalt" });
    const targetUser = await User.findOne({
      where: {
        userID: userIDparam,
      },

    });
    if (!targetUser) return res.status(404).send({ error: "Ez a felhasználó nem található" });

    targetUser.cardNumber = kod.replace("\r", "")
    targetUser.save()
    return res.status(200).send({ status: "Kártya hozzáadva" });
  })
});

router.post("/:userID/addGroup", require("../../middleware/user"), async (req, res) => { /* KÁRTYA HOZZÁRENDELÉSE */
  const userIDparam = req.params.userID
  const { groupID } = req.body;

  if (!userIDparam || !groupID) return res.status(400).send({ error: "Hiányzó paraméterek" });

  const group = await Group.findOne({
    where: {
      groupID: groupID
    },
  });
  if (!group) return res.status(404).send({ error: "Csoport nem létezik" })

  const user = await User.findOne({
    where: {
      userID: userIDparam
    },
  });
  if (!user) return res.status(404).send({ error: "Felhasználó nem létezik" })

  if (user?.groupID) return res.status(400).send({ error: "Felhasználó már része egy csoportnak" })


  user.groupID = group.groupID
  user.save().then(() => {
    return res.send({ status: "Felhasználó hozzá adva a csoporthoz" })
  })
});


router.post("/:userID/removeGroup", require("../../middleware/user"), async (req, res) => { /* KÁRTYA HOZZÁRENDELÉSE */
  const userIDparam = req.params.userID
  const { groupID } = req.body;

  if (!userIDparam || !groupID) return res.status(400).send({ error: "Hiányzó paraméterek" });

  const group = await Group.findOne({
    where: {
      groupID: groupID
    },
  });
  if (!group) return res.status(404).send({ error: "Csoport nem létezik" })

  const user = await User.findOne({
    where: {
      userID: userIDparam
    },
  });
  if (!user) return res.status(404).send({ error: "Felhasználó nem létezik" })

  if (!user?.groupID) return res.status(400).send({ error: "Felhasználó nem része csoportnak" })


  user.groupID = null
  user.save().then(() => {
    return res.send({ status: "Felhasználó törölve a csoportból" })
  })
});


module.exports = router;
