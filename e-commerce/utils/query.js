import fs from "fs";
import path from "path";
import { logger } from "./logger.js";
import { loggers } from "winston";

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
        logger.error(`Error in getAllProduct: ${error.message}`);
        console.log("Error getAllProduct :>> ", error.message);
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
        logger.info(`getProductById() where id :>> : ${id}`);
        return productList.find((product) => {
            return product.id == id;
        });
    } catch (error) {
        logger.error(`Error in getProductById: ${error.message}`);
        console.log("Error getProductById :>> ", error.message);
        return [];
    }
};

/**
 * Add the product into cart.
 */
export const addToCart = async (id, quantity) => {
    try {
        const bufferData = fs.readFileSync(path.join("db", "cart.data.json"));
        const cartDetails = JSON.parse(bufferData);
        const productDetails = getProductById(id);
        if (productDetails?.id) {
            const currentIndex = cartDetails.findIndex((item) => item.id == id);
            if (currentIndex != -1) {
                logger.info(
                    `Update in cart product id: ${id}, quantity: ${quantity}`
                );
                quantity = quantity;
                cartDetails[currentIndex] = { id, quantity };
            } else {
                logger.info(
                    `Add in cart product id: ${id}, quantity: ${quantity}`
                );
                cartDetails.push({
                    id: productDetails?.id,
                    quantity: 1,
                });
            }
            await fs.promises.writeFile(
                path.join("db", "cart.data.json"),
                JSON.stringify(cartDetails)
            );
            return true;
        } else {
            throw new Error("Product not exist in DB.");
        }
    } catch (error) {
        logger.error("Problem in add to cart: ", error.message);
        console.log("Error addToCart :>> ", error.message);
        return false;
    }
};

/**
 * Check product is present into cart or not.
 */
export const checkProductPresentInCart = (id) => {
    try {
        const bufferData = fs.readFileSync(path.join("db", "cart.data.json"));
        const cartDetails = JSON.parse(bufferData);
        logger.info(`Check length of cart: ${cartDetails.length}`);
        if (cartDetails.length) {
            return cartDetails.findIndex((element) => {
                return element.id == id;
            });
        }
        return -1;
    } catch (error) {
        logger.error(`Error checkProductPresentInCart :>> ${error.message}`);
        return -1;
    }
};

/**
 * Get cart details.
 */
export const cartDetails = () => {
    try {
        const shoppingCart = { items: [], subTotal: 0, taxes: 0, total: 0 };
        const bufferData = fs.readFileSync(path.join("db", "cart.data.json"));
        const cartDetails = JSON.parse(bufferData);

        const totalPrices = cartDetails.map((items) => {
            return items.quantity * getProductById(items.id)?.price;
        });

        totalPrices.forEach((price) => (shoppingCart.subTotal += price));
        shoppingCart.taxes = shoppingCart.subTotal * 0.1;
        shoppingCart.total = shoppingCart.subTotal + shoppingCart.taxes;

        /**
         * Merge product detail and cart details.
         */
        cartDetails.forEach((items) => {
            const quantity = items.quantity;
            const { price, ...rest } = getProductById(items.id);
            shoppingCart.items.push({
                ...rest,
                quantity,
                price,
                amount: price * quantity,
            });
        });
        return shoppingCart;
    } catch (error) {
        loggers.error(` Error while fetching cartDetails: ${error.message}`);
        console.log("Error :>> ", error.message);
        return [];
    }
};

/**
 * Remove item from cart.
 */
export const removeItem = async (id) => {
    try {
        const filePath = path.join("db", "cart.data.json");
        const bufferData = fs.readFileSync(filePath);
        const cartDetails = JSON.parse(bufferData);
        const productIndex = cartDetails.findIndex((ele) => ele.id == id);

        if (productIndex === -1) {
            return false; // Item not found
        }

        // Remove the item from the cart
        cartDetails.splice(productIndex, 1);
        await fs.promises.writeFile(filePath, JSON.stringify(cartDetails));
        logger.info(`Product remove from cart. Product id: ${id}`);
        return true; // Item removed successfully
    } catch (error) {
        loggers.error(` Error while removing item: ${error.message}`);
        console.error("Error while removing item:", error.message);
        throw error;
    }
};

/**
 * Search and filter the product list.
 */
export const searchItems = (value) => {
    try {
        const filePath = path.join("db", "product.data.json");
        const bufferData = fs.readFileSync(filePath);
        const productList = JSON.parse(bufferData);

        // Normalize the search value to lowercase.
        const normalizedValue = value.toLowerCase();

        const filterList = productList.filter((item) => {
            return (
                item.name.toLowerCase().includes(normalizedValue) ||
                item.brand.toLowerCase().includes(normalizedValue) ||
                item.description.toLowerCase().includes(normalizedValue)
            );
        });

        return filterList;
    } catch (error) {
        loggers.error(`Error while searching item: ${error.message}`);
        console.error("Error while searching item:", error.message);
        throw error; // You can choose to return an empty array instead if preferred
    }
};
