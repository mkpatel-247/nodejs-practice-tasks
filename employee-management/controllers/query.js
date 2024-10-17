import fs from "fs";

/**
 * Query function to read data from file.
 */
export const query = {
    findAll: function (db_url) {
        try {
            const dbData = fs.readFileSync(db_url);
            return JSON.parse(dbData);
        } catch (error) {
            console.log("Error in findAll() :>> ", error.message);
            return [];
        }
    },
    findOne: function (db_url, id) {
        try {
            const dbData = fs.readFileSync(db_url);
            const jsonData = JSON.parse(dbData);

            const detail = jsonData.find((item) => item.id == id);
            const index = jsonData.findIndex((item) => item.id == id);

            return { detail, index };
        } catch (error) {
            console.log("Error in findAll() :>> ", error.message);
            return {};
        }
    },
};

/**
 * Insert new data into file.
 */
export const writeFile = (db_url, data) => {
    try {
        fs.writeFileSync(db_url, JSON.stringify(data));
        return true;
    } catch (error) {
        console.log(`Error while writing ${db_url}`);
        return false;
    }
};
