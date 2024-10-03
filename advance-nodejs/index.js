const http = require("http");
const router = require("router")();
const bodyParser = require("body-parser");
const port = 9000;

router.use(bodyParser.json());

const operations = require("./module/dataProcessor");

router.get("/get-data", async (req, res, next) => {
  try {
    const { status, message, code, data } = await operations.getData();
    if (status) {
      res.writeHead(code, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ statusCode: code, message, data }));
    }
    res.writeHead(code, { "Content-Type": "application/json" });
    throw new Error(message);
  } catch (error) {
    // res.writeHead(error.code, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ statusCode: res.statusCode, message: error.message })
    );
  }
});

router.post("/add-data", (req, res, next) => {
  try {
    const { item } = req.body;

    if (item) {
      const { status, message, code } = operations.callback(
        operations.addData(item)
      );
      if (status) {
        res.writeHead(code, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ statusCode: code, message }));
      }
      res.writeHead(code, { "Content-Type": "application/json" });
      throw new Error(message);
    }
    res.writeHead(code, { "Content-Type": "application/json" });
    throw new Error({ code: 400, message: "Please enter item." });
  } catch (error) {
    // console.log(error.json());

    // res.writeHead(error.code, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ statusCode: res.statusCode, message: error.message })
    );
  }
});

router.put("/update-item", (req, res, next) => {
  try {
    const { position, newValue } = req.body;

    if (typeof position == "number" && typeof newValue == "number") {
      const { status, message, code } = operations.callback(
        operations.updateData(position, newValue)
      );

      if (status) {
        res.writeHead(code, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ statusCode: code, message }));
      }
      res.writeHead(code, { "Content-Type": "application/json" });
      throw new Error(message);
    }
    res.writeHead(code, { "Content-Type": "application/json" });
    throw new Error({ code: 400, message: "Please enter a valid input." });
  } catch (error) {
    // console.log(error.message, error.code);
    // res.writeHead(error.code, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ statusCode: res.statusCode, message: error.message })
    );
    // res.end(JSON.stringify(error.message));
  }
});

http
  .createServer((req, res) => {
    router(req, res, () => {});
    // res.end();
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
