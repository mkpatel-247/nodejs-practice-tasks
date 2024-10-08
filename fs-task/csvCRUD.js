import fs from "fs";

/**
 * Write in CSV file.
 */
export const writeCsv = () => {
    try {
        fs.createReadStream("./private/csvData.json")
            .on("data", (chunk) => {
                createWriteCSV(chunk, "CSV file created.");
            })
            .on("error", function (error) {
                console.log(`error: ${error.message}`);
            });
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Read CSV file.
 */
export const readCsv = () => {
    try {
        fs.createReadStream("./private/dataDir/data.csv").on(
            "data",
            (bufferData) => {
                console.log("Data of CSV file.");
                console.log("-----------------------------------");
                bufferData
                    .toString()
                    .split("\n")
                    .forEach((ele, index) => {
                        console.log(`Row ${index + 1} Data: > ${ele}`);
                    });
                console.log("-----------------------------------");
                return bufferData;
            }
        );
    } catch (error) {
        console.log("Unexpected error :>> ", error);
    }
};

/**
 * Check the file is exists or not.
 */
export const isCsvExists = () => {
    return fs.existsSync("./private/dataDir/data.csv");
};

/**
 * Update record in csv.
 */
export const updateCsv = (id, name, age) => {
    try {
        fs.createReadStream("./private/dataDir/data.csv").on(
            "data",
            (bufferData) => {
                const data = convertCSVDataIntoJSONArray(bufferData);
                const index = data.findIndex((ele) => ele.id == id);
                if (index >= 0) {
                    data[index] = { id, name, age };
                    createWriteCSV(JSON.stringify(data), "CSV file updated.");
                } else {
                    console.log("Record not found.");
                }
            }
        );
    } catch (error) {
        console.log("Unexpected error :>> ", error);
    }
};

/**
 * Delete record from csv.
 */
export const deleteCsv = (id) => {
    try {
        fs.createReadStream("./private/dataDir/data.csv").on(
            "data",
            (bufferData) => {
                const data = convertCSVDataIntoJSONArray(bufferData);
                const index = data.findIndex((ele) => ele.id == id);
                
                if (index >= 0) {
                    data.splice(index, 1);
                    createWriteCSV(JSON.stringify(data), `Record deleted.`);
                } else {
                    console.log("Record not found.");
                }
            }
        );
    } catch (error) {
        console.log("Unexpected error :>> ", error);
    }
};

/**
 * Convert csv file buffer data into JSON array of object.
 */
const convertCSVDataIntoJSONArray = (csvData) => {
    const csvFileData = csvData.toString().split("\n");
    const header = csvFileData[0].split(",");
    //Removing header from csvFileData.
    csvFileData.splice(0, 1);

    const rowWiseData = csvFileData;
    const convertData = [];

    for (let i = 0; i < csvFileData.length; i++) {
        const jsonObject = {};
        const splitData = rowWiseData[i].split(",");
        if (splitData[0]) {   
            for (let j = 0; j < header.length; j++) {
                jsonObject[header[j].trim()] = splitData[j].trim();
            }
        }
        convertData.push(jsonObject);
    }
    return convertData;
};

/**
 * Convert chunk and write in csv file.
 * @param {*} chunk data that need to write in csv
 */
const createWriteCSV = (chunk, message) => {
    const data = JSON.parse(chunk.toString());

    const newData = data.reduce((acc, user, index) => {
        acc += `${index > 0 ? "\n" : ""} ${user.id}, ${user.name}, ${user.age}`;
        return acc;
    }, `id, name, age\n`);

    const writer = fs.createWriteStream("./private/dataDir/data.csv");
    writer.write(newData);
    writer.on("finish", () => {
        console.log(message);
    });
    writer.end();
};
