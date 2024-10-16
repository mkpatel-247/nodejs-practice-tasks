$(function () {
    $(document).on("submit", "#add-employee-form", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const name = $("#emp-name").val();
        const email = $("#emp-email").val();
        const joiningDate = $("#emp-joining-date").val();
        const department = $("#emp-department").val();
        const designation = $("#emp-designation").val();
        const gender = $("input[name='emp-gender']:checked").val();

        // // Create a data object
        // const formData = { name, email, joiningDate, department, designation, gender };

        // Make an API call to add employee.
        try {
            const res = await fetch(`/api/add-employee/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    joiningDate,
                    department,
                    designation,
                    gender,
                }),
            });
            const result = await res.json();
            if (result.status === 200) {
                window.location.replace("/"); // Redirect on successful to list page.
            } else {
                alert(`Error: >> ${result.message}`);
                console.error("Failed to submit form. Status:", res.status);
            }
        } catch (error) {
            alert(`Error: >> ${error.message}`);
            console.error("Error while submitting form:", error.message);
        }
    });

    /**
     * Trim the name input field.
     */
    $(document).on("blur", "#emp-name", function (event) {
        $("#emp-name").val(event.currentTarget.value.trim());
    });
    /**
     * Trim the email input field.
     */
    $(document).on("blur", "#emp-email", function (event) {
        $("#emp-email").val(event.currentTarget.value.trim());
    });

    /**
     * Edit button
     */
    $(document).on("click", "#update-employee", async function (event) {
        try {
            const id = event.currentTarget.value;

            const res = await fetch(`/api/get-employee/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            if (result.status == 200) {
                window.location.replace(`/add-emp?id=${id}`);
            }
        } catch (error) {
            alert("Error :>> ", error.message);
            console.log("Error update-employee script :>> ", error.message);
        }
    });

    /**
     * Trim the salary input field.
     */
    $(document).on("blur", "#emp-salary", function (event) {
        $("#emp-salary").val(event.currentTarget.value.trim());
        // const value = $("#emp-salary").val();
        // $("#emp-salary").val(isNaN(value) ? 0 : value);
    });

    $(document).on("submit", "#salary-form", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const salary = $("#emp-salary").val();
        const id = $("#emp-id").val();

        // Make an API call to add employee.
        try {
            const res = await fetch(`/api/update-employee/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    salary,
                }),
            });
            const result = await res.json();
            if (result.status === 200) {
                window.location.replace("/"); // Redirect on successful to list page.
            } else {
                alert(`Error: >> ${result.message}`);
                console.error("Failed to submit form. Status:", res.status);
            }
        } catch (error) {
            alert(`Error: >> ${error.message}`);
            console.error("Error while submitting form:", error.message);
        }
    });
});

/**
 * Call api to delete employee
 */
async function removeEmployee(id) {
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
            alert(`Error: >> ${error.message}`);
            console.error("Failed to delete item. Status:", res.status);
            return;
        }
    } catch (error) {
        console.error("Error while deleting item:", error.message);
        return;
    }
}
