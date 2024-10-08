import { deleteCsv, isCsvExists, readCsv, updateCsv, writeCsv } from "./csvCRUD.js";
import {
    copyFiles,
    createDir,
    deleteDir,
    existsDir,
    readDir,
    renameDir,
} from "./directoryOperationFunction.js";
import {
    writeFile,
    readFileSync,
    readFile,
    appendFileSync,
    appendFile,
    renameFileSync,
    renameFileAsync,
    fileExistSync,
    fileExist,
    openFileSync,
    openFileAsync,
    deleteSync,
    deleteAsync,
    writeFileSync,
} from "./fileOperationFunction.js";

// writeFileSync();
// writeFile();

// readFileSync();
// readFile();

// appendFileSync();
// appendFile();

// renameFileSync();
// renameFileAsync();

// fileExistSync();
// fileExist();

// openFileSync();
// openFileAsync();

// deleteSync();
// deleteAsync();

// existsDir();
// copyDir();

if (existsDir()) {
    // readDir();
    // renameDir();
    // copyFiles();
    // deleteDir();
    if (isCsvExists()) {
        readCsv();
        // updateCsv(2, "Updated Name", 30);
        // deleteCsv(2);
    } else {
        writeCsv();
    }
} else {
    createDir();
}