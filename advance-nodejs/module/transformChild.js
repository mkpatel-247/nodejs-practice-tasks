/**
 * Transform add deleted key in object.
 */
process.on("addDeleteKey", function (data) {
  process.send({ ...data, deleted: true });
});