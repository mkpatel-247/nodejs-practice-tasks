import fs from "fs";

/**
 * mkdir create folder.
 */
export const createDir = () => {
    try {
        fs.mkdir("./private/dataDir/", (err) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("dataDir is created!");
        });
    } catch (error) {
        console.log("Error :>> ", error);
    }
};
/**
 * readdir read folder.
 */
export const readDir = () => {
    try {
        fs.readdir("./private/dataDir/", (err, data) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            // console.log(fs.statSync('./private/dataDir'));
            console.log("Data dir: ", data);
        });
    } catch (error) {
        console.log("Error :>> ", error);
    }
    // return fs.statSync("./private/dataDir");
};
/**
 * Rename folder.
 */
export const renameDir = () => {
    try {
        fs.renameSync("./private/dataDir", "./private/dataDirectory");
        console.log("Rename from dataDir to dataDirectory!");
    } catch (error) {
        console.log("Error :>> ", error);
    }
};
/**
 * Check folder exists.
 */
export const existsDir = () => {
    return fs.existsSync("./private/dataDir");
};

/**
 * Copy folder
 */
export const copyFiles = () => {
    try {
        // fs.writeFileSync("./private/dataDirectory/demo.txt", "Copy file from one folder to another.");
        fs.cp(
            "./private/dataDirectory/",
            "./private/copy-file/",
            { recursive: true },
            (err) => {
                if (err) {
                    console.log("Error :>> ", error);
                } else {
                    console.log("All Files copied.");
                }
            }
        );
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

export const deleteDir = () => {
    try {
        fs.rmdir("./private/dataDirectory", (err) => {
            if (err) {
                console.log("Error :>> ", err.message);
            } else {
                console.log("folder deleted");
            }
        });
    } catch (error) {
        console.log("Error :>> ", error);
    }
};
