import express from "express";
import {
    addToCart,
    cartDetails,
    getAllProduct,
    getProductById,
    isCartEmpty,
    removeItem,
    searchItems,
} from "../utils/query.js";
const router = express.Router();

/**
 * Home page route.
 */
router.get("/", (req, res, next) => {
    const productList = getAllProduct();
    // displayProducts(productList);
    res.render("index", { products: productList });
});

/**
 * Product detail route.
 */
router.get("/product/:id", (req, res, next) => {
    const { id } = req.params;
    const detail = getProductById(id);
    const presentInCart = isCartEmpty().includes(id);
    console.log("Present in cart: ", presentInCart);

    // isCartEmpty();
    res.render("product-detail", {
        productDetail: detail,
        alreadyInCart: presentInCart
    });
});

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

/**
 * Search api route.
 */
router.post("/search", async (req, res, next) => {
    const { searchQuery } = req.query;
    console.log("Search: ", searchQuery);
    const searchList = await searchItems(searchQuery);
    return res.status(200).send({ data: searchList });
});

export default router;
