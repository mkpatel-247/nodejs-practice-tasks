import express from "express";
import {
    addToCart,
    cartDetails,
    getAllProduct,
    getProductById,
    removeItem,
} from "../utils/query.js";
const router = express.Router();

/**
 * Home page route.
 */
router.get("/", (req, res, next) => {
    const productList = getAllProduct();
    res.render("index", { products: productList });
});

/**
 * Product detail route.
 */
router.get("/product/:id", (req, res, next) => {
    const { id } = req.params;
    const detail = getProductById(id);
    // isCartEmpty();
    res.render("product-detail", {
        productDetail: detail,
    });
});

/**
 * Add to cart.
 */
router.post("/add-to-cart/:id", async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    if (await addToCart(id, quantity)) {
        return res.status(200).send();
    } else {
        return res.status(400).send();
    }
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
