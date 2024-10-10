import fs from "fs";

/**
 * Get data from file.
 * @param {*} file filePath
 * @returns data from file.
 */
export const getDataFromDB = (file) => {
    if (fs.existsSync(file)) {
        const bufferData = fs.readFileSync(file);
        return JSON.parse(bufferData.toString());
    }
    return [];
};

/**
 * Add data into file.
 */
export const addDataIntoDB = (file, data) => {
    try {
        if (fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify(data));
            return true;
        } else {
            throw new Error("File not exist.");
        }
    } catch (error) {
        return error;
    }
    // else {
    //     fs.mkdir(file, (err) => {
    //         if (err) {
    //             console.log("Error :>> ", err);
    //         }
    //         fs.writeFileSync(file, JSON.stringify(data));
    //     });
    // }
};
