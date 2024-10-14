$(function () {
    /*
     * When clicking on the `+` button.
     */
    $(document).on("click", "#btn-plus", async function () {
        const dataId = $(this).data("id");
        const inputField = $(this)
            .closest(".input-group")
            .find("#product-quantity");
        let currentQuantity = parseInt(inputField.val());
        currentQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;
        await addUpdateItem(dataId, currentQuantity + 1);
        inputField.val(currentQuantity + 1);
    });

    /**
     * When clicking on the `-` button.
     */
    $(document).on("click", "#btn-minus", async function () {
        const dataId = $(this).data("id");
        const inputField = $(this)
            .closest(".input-group")
            .find("#product-quantity");
        let currentQuantity = parseInt(inputField.val());
        currentQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;
        if (currentQuantity > 1) {
            const updateQuantity = currentQuantity - 1;
            await addUpdateItem(dataId, updateQuantity);
            inputField.val(updateQuantity);
        }
    });

    /**
     * Add product in cart.
     */
    $(document).on("click", "#add-to-cart", async function () {
        const dataId = $(this).data("id");
        await addUpdateItem(dataId, 1);
    });

    /**
     * Call delete api.
     */
    $(document).on("click", "#remove-item", async function () {
        const dataId = $(this).data("id");
        try {
            const res = await fetch(`/remove/${dataId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status == 200) {
                $(this).closest(".cart-item").remove();
                console.log("Item removed from cart.");

                // setTimeout(() => {
                window.location.replace("/cart");
                // }, 100);
            } else {
                console.error("Failed to remove item. Status:", res.status);
            }
        } catch (error) {
            console.error("Error while removing item:", error.message);
        }
    });
});

/**
 * Add/Update product in cart.
 */
async function addUpdateItem(id, quantity) {
    try {
        const res = await fetch(`/add-to-cart/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
        });
        if (res.status == 200) {
            window.location.replace("/cart");
            return;
        } else {
            console.error("Failed to add/update item. Status:", res.status);
            return;
        }
    } catch (error) {
        console.error("Error while adding/updating item:", error.message);
        return;
    }
}

/**
 * Search product.
 */
async function searchProduct() {
    try {
        const searchValue = document.getElementById("search-item");
        const res = await fetch(`/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: searchValue.value }),
        });

        if (res.status == 200) {
            const result = await res.json();
            console.log("Data search:", result.data);
            return result.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error while searching item:", error.message);
        return [];
    }
}
