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

export const addDataIntoDB = (file, data) => {
    return false;
    // try {
    //     if (fs.existsSync(file)) {
    //         fs.writeFileSync(file, JSON.stringify(data));
    //         return true;
    //     }
    //     throw new Error("File not exist.");
    // } catch (error) {
    //     console.log("Error :>> ", error);
    //     return false;
    // }
    // else {
    //     fs.mkdir(file, (err) => {
    //         if (err) {
    //             console.log("Error :>> ", err);
    //         }
    //         fs.writeFileSync(file, JSON.stringify(data));
    //     });
    // }
};
