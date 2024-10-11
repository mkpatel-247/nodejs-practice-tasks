$(function () {
    /**
     * When click on `+` button.
     */
    $(document).on("click", "#btn-plus", function () {
        const currentQuantity = document.getElementById("product-quantity");
        console.log("currentQuantity :>> ", currentQuantity.value);
        currentQuantity.value = parseInt(currentQuantity.value) + 1;
    });
    /**
     * When click on `-` button.
     */
    $(document).on("click", "#btn-minus", function () {
        const currentQuantity = document.getElementById("product-quantity");
        console.log("currentQuantity :>> ", currentQuantity.value);
        if (currentQuantity.value > 0) {
            currentQuantity.value = parseInt(currentQuantity.value) - 1;
        }
    });
});
