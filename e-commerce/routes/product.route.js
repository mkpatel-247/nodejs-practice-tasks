import express from "express";
import {
    addToCart,
    cartDetails,
    getAllProduct,
    getProductById,
    checkProductPresentInCart,
    removeItem,
    searchItems,
} from "../utils/query.js";
const router = express.Router();

/**
 * Home page route.
 */
router.get("/", async (req, res, next) => {
    const productList = getAllProduct();

    const { searchQuery } = req.query;

    if (searchQuery) {
        const searchList = await searchItems(searchQuery);
        res.render("index", { products: searchList, searchValue: searchQuery });
    } else {
        res.render("index", { products: productList });
    }
});

/**
 * Product detail route.
 */
router.get("/product/:id", (req, res, next) => {
    const { id } = req.params;
    const detail = getProductById(id);
    const presentInCart = checkProductPresentInCart(id);
    const products = {
        ...detail,
        alreadyInCart: presentInCart != -1,
    };

    res.render("product-detail", {
        productDetail: products,
    });
});

/**
 * Cart page.
 */
router.get("/cart", (req, res, next) => {
    const shoppingCart = cartDetails();
    res.render("cart", {
        items: shoppingCart?.items,
        subTotal: shoppingCart.subTotal,
        taxes: shoppingCart.taxes,
        total: shoppingCart.total,
    });
});

/**
 * Extra API ROUTE.
 */

/**
 * Add to cart.
 */
router.post("/add-to-cart/:id", async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    if (await addToCart(id, quantity)) {
        return res.status(200).send({
            status: 200,
            success: true,
        });
    }
    return res.status(400).send({
        status: 400,
        success: false,
    });
});

/**
 * Remove product from cart.
 */
router.delete("/remove/:id", async (req, res, next) => {
    const { id } = req.params;
    if (await removeItem(id)) {
        return res.status(200).send();
    }
    return res.status(400).send();
});

export default router;
