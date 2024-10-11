$(function () {
    $(document).on("click", "#increaseItem", function () {
        const currentQuantity = document.getElementById("product-quantity");
        console.log("currentQuantity :>> ", currentQuantity);
        // currentQuantity += 1;
    });
});
