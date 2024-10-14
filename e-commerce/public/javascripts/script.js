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
    $(document).on("click", "#add-to-cart", function () {
        const dataId = $(this).data("id");
        addUpdateItem(dataId, 1);
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
                // $(this).closest(".cart-item").remove();

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
        console.log("Response.........", res);
        if (res.status == 200) {
            const response = await res.json();
            console.log("---------------------------", response.status, res.status);

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
        const res = await fetch(`/search?searchQuery=${searchValue.value}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.status == 200) {
            const result = await res.json();
            console.log("Data search:", result.data);
            displayProducts(result.data);
            return result.data;
            // res.render("index", { products: result.data });

        } else {
            return [];
        }
    } catch (error) {
        console.error("Error while searching item:", error.message);
        return [];
    }
}

// Function to display products in the HTML
function displayProducts(products) {
    const productsContainer = document.getElementById("product-list");
    console.log("productsContainer: ", productsContainer);

    productsContainer.innerHTML = ""; // Clear existing products

    // if (products.length === 0) {
    //     productsContainer.innerHTML = "<p>No products found.</p>"; // Show message if no products found
    //     return;
    // }

    // Create HTML for each product and append to container
    products.forEach(product => {
        const productCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title text-truncate">
                            {{capitalize ${product.name}}}</h5>
                        </div >
                        <p class="card-text text-muted">{{${product.description}}}</p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="text-success fw-bold">{{formatPrice${product.price}}}</span>
                            <a href="/product/${product.id}" class="btn btn-primary btn-sm">View Details</a>
                        </div>
                    </div >
                </div >
            </div > `;

        productsContainer.innerHTML += productCard; // Append product card to container
    });
}