import fs from "fs";

/**
 * Note: When asynchronous process is used callback is compulsory.
 */

/**
 * File created using asynchronous process.
 */
export const writeFile = () => {
    try {
        //File created using sync way.
        fs.writeFile(
            "./private/hello_async.txt",
            "Hello, World! async",
            (err) => {
                if (err) {
                    console.log('Error :>> ', err);
                }
                console.log("file created!");
            }
        );
    } catch (error) {
        console.log("Error: ", error);
    }
};

/**
 * File created using synchronous process.
 */
export const writeFileSync = () => {
    try {
        fs.writeFileSync("./private/hello.txt", "Hello, World!");
        console.log("File create using synchronous process.");
    } catch (error) {
        console.log("Error: ", error);
    }
};

/**
 * File read using asynchronous process.
 */
export const readFile = () => {
    try {
        fs.readFile("./private/hello_async.txt", "utf-8", (err, data) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("Async read: ", data); //console.log(data.toString());
        });
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * File read using synchronous process.
 */
export const readFileSync = () => {
    try {
        const fileData = fs.readFileSync("./private/hello.txt");
        console.log("File info: ", fileData.toString("utf-8"));
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * File append using synchronous process.
 */
export const appendFileSync = () => {
    try {
        fs.appendFileSync("./private/hello.txt", "How are you?");
        console.log("File appended data.");
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * File created using asynchronous process.
 */
export const appendFile = () => {
    try {
        fs.appendFile("./private/hello_async.txt", " How are you?", (err) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("File appended data async.");
        });
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * File rename using asynchronous process.
 */
export const renameFileAsync = () => {
    try {
        fs.rename(
            "./private/hello_async.txt",
            "./private/greeting_async.txt",
            (err) => {
                if (err) {
                    console.log('Error :>> ', err);
                }
                console.log("File rename async");
            }
        );
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * File created using synchronous process.
 */
export const renameFileSync = () => {
    try {
        fs.renameSync("./private/hello.txt", "./private/greeting.txt");
        console.log("File rename to greeting.");
    } catch (error) {
        console.log("error :>> ", error);
    }
};

/**
 * Check file exist using synchronous process.
 */
export const fileExistSync = () => {
    try {
        if (fs.existsSync("./private/hello.txt")) {
            console.log("File exists!");
        } else {
            throw new Error("File not exist!");
        }
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Check file exist using asynchronous process.
 */
export const fileExist = () => {
    try {
        fs.exists("./private/hello_async.txt", (err) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("File exists async");
        });
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Open file using synchronous process.
 */
export const openFileSync = () => {
    try {
        const data = fs.openSync("./private/greeting.txt");
        console.log("data sync :>> ", data);
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Open file using asynchronous process.
 */
export const openFileAsync = () => {
    try {
        fs.open("./private/greeting_async.txt", (err, data) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("Data async :>> ", data);
        });
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Delete file using synchronous process.
 */
export const deleteSync = () => {
    try {
        fs.unlinkSync("./private/greeting.txt");
        console.log("File greeting deleted.");
    } catch (error) {
        console.log("Error :>> ", error);
    }
};

/**
 * Delete file using asynchronous process.
 */
export const deleteAsync = () => {
    try {
        fs.unlink("./private/greeting_async.txt", (err, data) => {
            if (err) {
                console.log('Error :>> ', err);
            }
            console.log("File is deleted async!");
        });
        
    } catch (error) {
        console.log("Error :>> ", error);
    }
};
