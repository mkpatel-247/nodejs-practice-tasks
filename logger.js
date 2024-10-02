const http = require("http");
const router = require("router")();
const cors = require("cors");
const bodyParser = require("body-parser");
const color = require("colors");
const port = 9000;

router.use(bodyParser.json());
router.use(cors());

/**
 * Logger server is created.
 */
http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    router(req, res, () => {});
  })
  .listen(port, () => {
    console.log("-------------------------------------------");
    console.log(`Server is started and running on ${port}`);
  });

router.post("/log", (req, res, next) => {
  try {
    const body = req.body;

    // console.log("Body: ", body.type.color.red);
    res.writeHead(200, { "Content-Type": "application/json" });

    switch (body.type) {
      case "error":
        console.log(color.red(body.message));
        break;
      case "warn":
        console.log(color.yellow(body.message));
        break;
      default:
        console.log(color.bgMagenta(body.message));
        break;
    }
    return res.end("request logged.");
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(error);
  }
});
