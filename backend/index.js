const { sequelize, User, Group, Log } = require("./schema");
const moment = require('moment');

const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { parser, port } = require("./Serial");

require("./auth/Login");

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error("Database connection error:", error));

sequelize
  .sync(
    {

    }
  )
  .then(async () => {
    console.log("Database synced!")


    const [user, created] = await User.findOrCreate({
      where: {
        email: "admin@admin"
      },
      defaults: {
        email: "admin@admin",
        password: "x",
        name: "Admin",
        cardNumber: "154223229132"
      },

    })

    if (created) {
      user.createPassword("admin")
      console.log("New admin")
    }

  })
  .catch((error) => console.error("Error syncing database:", error));

app.get("/", (req, res) => {
  res.send(`API ${process.env.API_VERSION}`);
});

const SessionStore = require("express-session-sequelize")(session.Store);
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

//TODO: fix for new DB
app.use(
  session({
    secret: "sg5VmgX5AZ2V1Ot7NeKAGCGkFtB1qu8Y2Lak2MmaC",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: sequelizeSessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api", require("./router"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Sign-ey elindult a ${process.env.SERVER_PORT} porton `);
});

var doorClosed = true

parser.on('data', async (sor) => {

  switch (sor?.replace("\r", "")) {
    case "NYITAS-MANUAL":
      doorClosed = false

      const log1 = new Log({
        entryTime: new Date(),
        exitTime: new Date(),
        action: "OPEN"
      })

      log1.save()
      break;
    case "ZARAS-MANUAL":
      doorClosed = true

      const log2 = new Log({
        entryTime: new Date(),
        exitTime: new Date(),
        action: "CLOSE"
      })

      log2.save()
      break;
    case "RESET":

      const log3 = new Log({
        entryTime: new Date(),
        exitTime: new Date(),
        action: "RESET"
      })

      log3.save()
      break;
    default:
      break;
  }


  const adatok = sor.split(":")
  const kod = adatok[1]?.replace("\r", "")
  if (!kod) return
  console.log(kod)
  const felhasznalo = await User.findOne({
    where: {
      cardNumber: kod
    },
    include: Group


  })
  if (felhasznalo) {
    console.log(felhasznalo?.name, felhasznalo?.Group?.name, felhasznalo?.Group?.enterTimeRange, felhasznalo?.Group?.exitTimeRange)
    if (!felhasznalo?.Group?.enterTimeRange || !felhasznalo?.Group?.exitTimeRange) {
      return console.log(" Nincs belépés vagy kilépés idő")

    }


    const enterTimeRange = felhasznalo?.Group?.enterTimeRange?.split("-")
    const enterTimeStart = parseInt(enterTimeRange[0]?.replace(":", ""))
    const enterTimeEnd = parseInt(enterTimeRange[1].replace(":", ""))

    const exitTimeRange = felhasznalo?.Group?.exitTimeRange?.split("-")
    const exitTimeStart = parseInt(exitTimeRange[0].replace(":", ""))
    const exitTimeEnd = parseInt(exitTimeRange[1].replace(":", ""))
    console.log(exitTimeStart, exitTimeEnd)

    const time = parseInt(new Date().toTimeString().slice(0, 5).replace(":", ""))

    /*   console.log(enterTimeStart)
      console.log(time)
      console.log(enterTimeEnd) */

    if (adatok[0] == "KOD") {



      if (time > enterTimeStart && time < enterTimeEnd) {

        if (
          doorClosed == true
        ) {
          setTimeout(function () {
            console.log("Idő le telt");
            port.write("ZAR")
          }, 3000);
        }

        port.write("NYIT")
        console.log("EKKOR BELÉPHETEK")

        const log = new Log({
          userID: felhasznalo?.userID,
          entryTime: new Date(),
        })

        log.save()

      } else {
        console.log("Nem léphet be")

      }
    }else{
      if (time > exitTimeStart && time < exitTimeEnd) {

        if (
          doorClosed == true
        ) {
          setTimeout(function () {
            console.log("Idő le telt");
            port.write("ZAR")
          }, 3000);
        }

        port.write("NYIT")
        console.log("EKKOR KILÉPHETEK")

        const log4 = new Log({
          userID: felhasznalo?.userID,
          exitTime: new Date(),
        })

        log4.save()

      } else {
        console.log("Nem léphet ki")

      }
    }

  } else {
    console.log(
      "Nincs felhasználó rendelve az adott kártyához!"
    )
  }
})
