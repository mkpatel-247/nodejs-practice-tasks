import fs from "fs";
import csvParser from "csv-parser";

export const writeCsv = () => {
    try {
        
    const bufferData = fs.readFileSync("./private/csvData.json");
    const data = JSON.parse(bufferData.toString());

    const keys = Object.keys(data[0]);
    const value = Object.values(data);
    console.log(keys, value);
    const result = [];

    fs.createReadStream("./private/dataDir/data.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            result.push(data);
        })
        .on("end", () => {
            console.log(result);
        });
    
    // fs.writeFile('./private/dataDir/data.csv', data, "utf-8", (err) => {
    //     if (err) throw err;
    //     console.log("Data inserted in csv.");
        
    // });
        
    } catch (error) {
        console.log('Error :>> ', error);
    }
    // fs.writeFile("./private/dataDir/data.csv", data, "utf-8", (err) => {
    //     if (err) throw err;
    //     console.log("Date is inserted.");
    // });
};
