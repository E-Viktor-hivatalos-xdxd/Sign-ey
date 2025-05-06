const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

var timer = false
var locked = true

const port = new SerialPort({ path: process.env.PORT, baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)

module.exports ={
    timer,
    locked,
    port, parser
}

