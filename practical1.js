const http = require("http");
const cors = require("cors");
const router = require("router")();
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const port = 9000;

router.use(bodyParser.json());

/**
 * Route for getting all users details.
 */
router.get("/users", (request, response) => {
  const userData = getDataFromFile("./tempory-data/userdata.json");
  response.writeHead(200, { "Content-Type": "application/json" });
  return response.end(JSON.stringify(userData));
});

/**
 * Route for getting specific user details.
 */
router.get("/user/:id", (request, response, next) => {
  const userData = getDataFromFile("./tempory-data/userdata.json");
  response.setHeader("Content-Type", "application/json");
  try {
    const { id } = request.params;
    const details = userData.find((element) => {
      return element.id == id;
    });
    if (!details) {
      response.statusCode = 404;
      return next(new Error("User not found!"));
    }
    response.statusCode = 200;
    return response.end(JSON.stringify(details));
  } catch (error) {
    response.statusCode = 404;
    return next(new Error("User not found!"));
  }
});

/**
 * Add user data.
 */
router.post("/user", (request, response, next) => {
  // console.log(request.body);
  try {
    const { phoneNumber, status, name, username, password, ...rest } =
      request.body;

    if (
      Object.keys(rest).length ||
      !phoneNumber ||
      !status ||
      !name ||
      !username ||
      !password
    ) {
      throw new Error("Please check the field!");
    }

    const userData = getDataFromFile("./tempory-data/userdata.json");
    const duplicate = userData.find((element) => {
      return element.username == username || element.phoneNumber == phoneNumber;
    });
    if (duplicate) {
      throw new Error("Duplicate record found!");
    }
    request.body["id"] = uuid.v4();

    userData.push(request.body);
    fs.writeFileSync("./tempory-data/userdata.json", JSON.stringify(userData));
    response.setHeader("Content-Type", "application/json");
    return response.end(
      JSON.stringify({
        status: 200,
        message: "User Added!",
      })
    );
  } catch (error) {
    return next(new Error(error.message));
  }
});

/**
 * Delete user details.
 */
router.delete("/user/:id", (request, response, next) => {
  const userData = getDataFromFile("./tempory-data/userdata.json");
  try {
    const { id } = request.params;
    const userIndex = userData.findIndex((element) => {
      return element.id == id;
    });
    if (!(userIndex >= 0)) {
      console.log("UserIndex: ", !userIndex);
      throw new Error();
    }
    userData.splice(userIndex, 1);
    //Response
    fs.writeFileSync("./tempory-data/userdata.json", JSON.stringify(userData));
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "User is deleted." }));
  } catch (error) {
    return next(new Error("User not found!"));
  }
});

/**
 * Update record.
 */
router.put("/user/:id", (request, response, next) => {
  const userData = getDataFromFile("./tempory-data/userdata.json");
  try {
    const { id } = request.params;
    const userIndex = userData.findIndex((element) => {
      return element.id == id;
    });

    if (userIndex < 0) {
      throw new Error("User not found!");
    }
    //Validated record field.
    const { phoneNumber, status, name, username, password, ...rest } =
      request.body;
    if (
      Object.keys(rest).length ||
      !phoneNumber ||
      !status ||
      !name ||
      !username ||
      !password
    ) {
      throw new Error("Please check the field!");
    }
    Object.assign(userData[index], request.body);
    userData[userIndex] = request.body;
    fs.writeFileSync("./tempory-data/userdata.json", JSON.stringify(userData));
    response.setHeader("Content-Type", "application/json");
    return response.end(
      JSON.stringify({
        status: 200,
        message: "User details Updated!",
      })
    );
  } catch (error) {
    return next(new Error(error.message));
  }
});

/**
 * Error Handling
 */
router.use((error, request, response, next) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  return response.end(JSON.stringify({ message: error.message }));
});

/**
 * Create a Server.
 */
http
  .createServer((request, response) => {
    router(request, response, () => {
      // return response.end("Request got...");
    });
  })
  .listen(port, () => {
    console.log(`\n-------------------------------------`);
    console.log(`Server is started, running on ${port}`);
  });

/**
 * Returns the data from file.
 * @returns
 */
function getDataFromFile(filePath) {
  const bufferData = fs.readFileSync(filePath);
  const data = JSON.parse(bufferData.toString());
  return data;
}
