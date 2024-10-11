import express from "express";
import { getAllProduct, getProductById } from "../utils/query.js";
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
    res.render("product-detail", {
        productDetail: detail,
    });
});

/**
 * Add to cart.
 */
router.get("/add-to-cart/:id", (req, res, next) => {
    const { id } = req.params;

    // const detail = getProductById(id);
    res.redirect(`product/${id}`);
});

/**
 * Cart page.
 */
router.get("/cart", (req, res, next) => {
    res.render("cart");
});

export default router;
