import fs from "fs";
import path from "path";

/**
 * Get all product details.
 */
export const getAllProduct = () => {
    try {
        const bufferData = fs.readFileSync(
            path.join("db", "product.data.json")
        );
        return JSON.parse(bufferData);
    } catch (error) {
        console.log("Error :>> ", error.message);
        return [];
    }
};

/**
 * Get a specific product from given id.
 */
export const getProductById = (id) => {
    try {
        const bufferData = fs.readFileSync(
            path.join("db", "product.data.json")
        );
        const productList = JSON.parse(bufferData);
        return productList.find((product) => {
            return product.id == id;
        });
    } catch (error) {
        console.log("Error :>> ", error.message);
        return [];
    }
};
