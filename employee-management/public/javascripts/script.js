$(function () {
    $(document).on("submit", "#add-employee-form", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form field values using jQuery
        const name = $("#emp-name").val();
        const email = $("#emp-email").val();
        const joiningDate = $("#emp-joining-date").val();
        const department = $("#emp-department").val();
        const designation = $("#emp-designation").val();
        const gender = $("input[name='emp-gender']:checked").val(); // Get selected gender

        // Create a data object
        const formData = {
            name: name,
            email: email,
            joiningDate: joiningDate,
            department: department,
            designation: designation,
            gender: gender,
        };

        // Make an API call
        try {
            const res = await fetch(`/api/add-employee/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send collected form data
            });
            if (res.status === 200) {
                window.location.replace("/"); // Redirect on successful submission
            } else {
                console.error("Failed to submit form. Status:", res.status);
            }
        } catch (error) {
            console.error("Error while submitting form:", error.message);
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

                window.location.replace("/cart");
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
async function deleteEmployee(id) {
    try {
        const res = await fetch(`/api/delete-employee/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status == 200) {
            await res.json();
            window.location.replace("/");
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
        const res = await fetch(`/?searchQuery=${searchValue.value.trim()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status == 200) {
            window.location.replace(`/?searchQuery=${searchValue.value}`);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error("Error while searching item:", error.message);
        return [];
    }
}
