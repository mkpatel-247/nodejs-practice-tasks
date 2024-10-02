const http = require("http");
const router = require("router")();
const cors = require("cors");
const bodyParser = require("body-parser");
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
  const reset = `\x1b[0m`;
  const colors = {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    bgCyan: "\x1b[46m",
  };
  try {
    const body = req.body;

    // console.log("Body: ", body.type.color.red);
    res.writeHead(200, { "Content-Type": "application/json" });

    switch (body.type) {
      case "error":
        console.log(
          `${colors.red} ${
            typeof body.message == "object"
              ? JSON.stringify(body.message, null, 2)
              : body.message
          } ${reset}`
        );
        break;
      case "warn":
        console.log(
          `${colors.yellow} ${
            typeof body.message == "object"
              ? JSON.stringify(body.message, null, 2)
              : body.message
          } ${reset}`
        );
        break;
      default:
        console.log(
          `${colors.bgCyan} ${
            typeof body.message == "object"
              ? JSON.stringify(body.message, null, 2)
              : body.message
          } ${reset}`
        );
        break;
    }
    return res.end("request logged.");
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(error);
  }
});
