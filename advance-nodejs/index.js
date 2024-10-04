const http = require("http");
const router = require("router")();
const bodyParser = require("body-parser");
const port = 9000;

router.use(bodyParser.json());

const operations = require("./module/dataProcessor");

/**
 * Get data.
 */
router.get("/get-data", async (req, res, next) => {
  try {
    const { status, message, statusCode, data } = await operations.getData();
    if (status) {
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ statusCode, message, data }));
    }
    throw new Error(JSON.parse({ statusCode, message }));
  } catch (error) {
    res.writeHead(error.statusCode, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ statusCode: error.statusCode, message: error.message })
    );
  }
});

/**
 * Add data.
 */
router.post("/add-data", (req, res, next) => {
  try {
    const { item } = req.body;

    if (item) {
      const { status, message, statusCode } = operations.callback(
        operations.addData(item)
      );
      if (status) {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ statusCode, message }));
      }
      throw new Error(JSON.parse({ statusCode, message }));
    }
    // res.writeHead(code, { "Content-Type": "application/json" });
    throw new Error(
      JSON.parse({ statusCode: 400, message: "Please enter item." })
    );
  } catch (error) {
    res.writeHead(error.statusCode, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(error));
  }
});

/**
 * Update existing data.
 */
router.put("/update-item", (req, res, next) => {
  try {
    const { position, newValue } = req.body;

    if (typeof position == "number" && typeof newValue == "number") {
      const { status, message, statusCode } = operations.callback(
        operations.updateData(position, newValue)
      );

      if (status) {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ statusCode, message }));
      }
      
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      throw new Error(JSON.parse({ statusCode, message }));
    }
    throw new Error(JSON.parse({
      statusCode: 400,
      message: "Please enter a valid input.",
    }));
  } catch (error) {
    res.writeHead(error.statusCode, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(error));
  }
});

router.delete("/delete-item/:index", async (req, res, next) => {
  try {
    const { index } = req.params;

    const { status, message, statusCode } = await operations.deleteData(index);

    if (status) {
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ statusCode, message }));
    }

    throw new Error({ statusCode, message });
  } catch (error) {
    res.writeHead(error.statusCode, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(error));
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
