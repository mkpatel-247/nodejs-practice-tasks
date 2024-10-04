/**
 * Transform add deleted key in object.
 */
process.on("message", function (data) {
  process.send({ ...data, deleted: true });
});