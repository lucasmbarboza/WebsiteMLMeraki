const express = require("express");
const cors = require("cors");
const app = express();
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);
// https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css

app.use(express.static(__dirname));
let optionsCors = {
  origin: [
    `https://vision.meraki.com/`,
    `https://vision.meraki.com/n1/vision/user`,
    `https://vision.meraki.com/n1/login/login`,
    `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css`,
    `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"`,
    `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css`,
    `http://127.0.0.1:8081/stream.html?src=camera1`,
    `http://127.0.0.1:3000`,
    `http://localhost:3000/socket.io/?`,
  ],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(optionsCors));
app.get("/", (req, res) => {
  if (res.statusCode == 200) {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.status(500).json({ health: "Server not health" });
  }
});

client.on("connect", function () {
  client.subscribe("<mqtt_topic>", function (err) {
    if (!err) {
      console.log("running");
    }
  });
});

io.on("connection", (socket) => {
  console.log(`New socket is connected: ${socket.id}`);
  client.on("message", function (topic, message) {
    io.emit("message", JSON.parse(message.toString()));
  });
});

server.listen(3000);
