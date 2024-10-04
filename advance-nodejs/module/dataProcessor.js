const childProcess = require("node:child_process");
const { dataResponse, apiResponse } = require("../config/apiResponse");
const path = require("path");
/**
 * Sample data in array.
 * {
 *  id: 1,
 *  item: test,
 *  deleted: false
 * }
 */

data = [];

const addData = (item) => {
  data.push({ id: data.length + 1, item: item });
  return apiResponse(true, "Item added in array", 200);
};

const updateData = (index, newItem) => {
  if (index >= 0) {
    if (data.length && index < data.length) {
      // data.with(index, newItem);
      data[index] = newItem;
      return apiResponse(true, `Item update at position of ${index}.`, 200);
    }
    return apiResponse(false, "First add item into array.", 400);
  }
  return apiResponse(false, "Please enter a valid input.", 400);
};

function callback(callbackFunc) {
  return callbackFunc;
}

const getData = () => {
  return new Promise((resolve, reject) => {
    if (data.length) {
      resolve(dataResponse(true, "In-memory array.", 200, data));
    } else {
      reject(apiResponse(true, "Empty array.", 400));
    }
  });
};

const deleteData = (index) => {
  if (!isNaN(index)) {
    const transformChild = path.resolve(__dirname, "transformChild.js");
    return new Promise((resolve, reject) => {
      if (data[index]) {
        // Created a child process.
        const childFork = childProcess.fork(transformChild);

        // Here the data from child process will be received.
        childFork.on("addDeleteKey", function (newData) {
          //Update the data array.
          data.splice(index, 1, newData);
          console.log("In-memory array: ", data);
          childFork.exitCode(0);
        });

        childFork.send(data[index]); // Data send to child.
        resolve(apiResponse(true, "Record deleted.", 200));
      } else {
        reject(apiResponse(false, "Please first add data.", 400));
      }
    });
  } 
  return apiResponse(false, "Please provide a valid input.", 400);

};

module.exports = { callback, addData, getData, updateData, deleteData };
