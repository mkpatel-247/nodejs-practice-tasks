const http = require("http");
const bodyPraser = require("body-parser");
const router = require("router")();
const uuid = require("uuid");
const port = 9000;
const url = "https://jsonplaceholder.typicode.com/users";

router.use(bodyPraser.json());

router.get("/users", async (req, res) => {
  //   try {
  const data = await (await fetch(url, { method: "GET" })).json();
  // if (data.ok) {
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(data));
  // } else {
  //   res.writeHead(404, { "Content-Type": "application/json" });
  //   return res.end(JSON.stringify({ message: "List is empty!" }));
  // }
  //   } catch (error) {}
});

router.post("/add-user", async (req, res) => {
  try {
    const { userId, id, title, completed } = req.body;
    const addItems = await (
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId, id, title, completed }),
      })
    ).json();

    // if (addItems.ok) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(addItems));
    // } else {
    //   res.writeHead(400, { "Content-Type": "application/json" });
    //   throw new Error("Item not added in list.");
    // }
  } catch (error) {
    return res.end(JSON.stringify(error.message));
  }
});

/**
 * Server is created.
 */
http
  .createServer((req, res) => {
    router(req, res, () => {});
  })
  .listen(port, () => {
    console.log(`Server is currently running on ${port}`);
  });

/**
 * Error handling
 */
// router.use((err, req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   return res.end(
//     JSON.stringify({
//       message: err.message,
//     })
//   );
// });
