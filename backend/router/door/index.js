const { Router } = require("express");
const { port, timer, parser } = require("../../Serial");

const router = Router();
//TODO: fix for new DB

router.get("/", require("../../middleware/user"), async (req, res) => {

  port.write("STATUSZ")
      parser?.once("data", async (data) => {
        return res.send(data)

      })      

})

router.post("/", require("../../middleware/user"), async (req, res) => {

  const { action } = req.body;

  switch (action) {
    case "OPEN":
      port.write("NYIT")
      parser?.once("data", async (data) => {
        if (data == "NYITAS\r") {
          return res.send({ status: "Nyitva" })
        } else { return res.send({ status: "Hiba" }) }

      })        

return
    case "CLOSE":
      port.write("ZAR")
      parser?.once("data", async (data) => {
        if (data == "ZARAS\r") {
          return res.send({ status: "Zárva" })
        } else { return res.send({ status: "Hiba" }) }

      })  
      return   
    case "TIMERON":
      timer = true
      return res.send({ status: "Időzítő bekapcsolva" })

    case "TIMEROFF":
      timer = false
      return res.send({ status: "Időzítő kikapcsolva" })

    default:
      return res.status(400).send({ status: "Parancs nem értelmezett" })

  }

});

module.exports = router;