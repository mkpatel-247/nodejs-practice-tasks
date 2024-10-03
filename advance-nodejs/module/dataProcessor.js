const { dataResponse, apiResponse } = require("../config/apiResponse");

data = [];

const addData = (item) => {
  data.push(item);
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
  data.splice(index, 1);
};

module.exports = { callback, addData, getData, updateData, deleteData };
