$(function () {
    $(document).on("submit", "#add-employee-form", async function (event) {
        event.preventDefault();

        const id = $("#emp-id").val();
        console.log("🚀 ~ id:", id);
        const name = $("#emp-name").val();
        const email = $("#emp-email").val();
        const joiningDate = $("#emp-joining-date").val();
        const department = $("#emp-department").val();
        const designation = $("#emp-designation").val();
        const gender = $("input[name='emp-gender']:checked").val();
        const salary = $("#emp-salary").val();

        // Make an API call to add employee.
        try {
            const res = await fetch(`/api/add-employee/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    email,
                    joiningDate,
                    department,
                    designation,
                    gender,
                    salary,
                }),
            });
            const result = await res.json();

            if (result.status === 200 || result.status === 201) {
                window.location.replace("/");
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
        event.preventDefault();
        $("#emp-name").val(event.currentTarget.value.trim());
    });
    /**
     * Trim the email input field.
     */
    $(document).on("blur", "#emp-email", function (event) {
        event.preventDefault();
        $("#emp-email").val(event.currentTarget.value.trim());
    });

    /**
     * Edit button
     */
    $(document).on("click", "#update-employee", async function (event) {
        event.preventDefault();

        try {
            const id = event.currentTarget.value;

            const res = await fetch(`/api/get-employee/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            console.log("🚀 ~ result:", result);
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
        event.preventDefault();
        const value = parseFloat(event.currentTarget.value.trim());

        if (value > 1000 && value < 100000) {
            $("#emp-salary").val(value);
        } else {
            alert("Please enter a valid salary between 1000 and 100000.");
            $("#emp-salary").val("");
        }
    });

    $(document).on("submit", "#salary-form", async function (event) {
        event.preventDefault();

        const salary = $("#emp-salary").val();
        const id = $("#emp-id").val();

        // Make an API call to update employee.
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

    /**
     * Make credit salary disable/enable.
     */
    $(document).on(
        "click",
        "input[name='selected-user-tick']",
        function (event) {
            if ($("input[name='selected-user-tick']:checked").length) {
                $("#credit-salary").prop("disabled", false);
            } else {
                $("#credit-salary").prop("disabled", true);
            }
        }
    );

    $(document).on(
        "click",
        "input[name='selected-user-tick']",
        function (event) {
            if (
                $("input[name='selected-user-tick']").length ==
                $("input[name='selected-user-tick']:checked").length
            ) {
                $("#select-all-employee").prop("checked", "checked");
            } else {
                $("#select-all-employee").prop("checked", false);
            }
        }
    );
    $(document).on(
        "click",
        "input[name='select-all-employee']",
        function (event) {
            if ($("input[name='select-all-employee']").prop("checked")) {
                $("input[name='selected-user-tick']").prop(
                    "checked",
                    "checked"
                );
                $("#credit-salary").prop("disabled", false);
            } else {
                $("input[name='selected-user-tick']").prop("checked", false);
                $("#credit-salary").prop("disabled", "disabled");
            }
        }
    );

    $(document).on("click", "#filter-button", async function (event) {
        const month = $("#month-wise-filter").val();
        const employee = $("#employee-wise-filter").val();
        filterSalaryData(employee, month);
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
        } else {
            alert(`Error: >> ${res.message}`);
            console.error("Failed to delete item. Status:", res.status);
            window.location.replace("/");
        }
    } catch (error) {
        alert(`Error: >> ${error.message}`);
        console.error("Error while deleting item:", error.message);
        window.location.replace("/");
    }
}

/**
 * Calling credit salary.
 */
async function creditSalary() {
    const month = document.getElementById("selected-month");
    if (month.value) {
        try {
            const checkboxes = document.querySelectorAll(
                "input[name='selected-user-tick']:checked"
            );

            const getSelectedIds = Array.from(checkboxes).map(
                (item) => item.value
            );

            const res = await fetch(`/api/send-salary/${month.value}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ids: getSelectedIds,
                }),
            });
            const result = await res.json();
            if (result.status == 200 || result.status == 201) {
                alert(`Message :>> ${result.message}`);
                window.location.replace("/");
            } else {
                alert(`Error :>> ${result.message}`);
                console.error("Error while sending salary :", result.message);
            }
        } catch (error) {
            alert(`Error :>> ${error.message}`);
            console.error("Error while sending salary :", error.message);
            return;
        }
    }
}

/**
 * Call salary history page api.
 */
async function filterSalaryData(id, month) {
    const apiRoute = `/salary-history?empId=${id}&month=${month}`;
    try {
        const res = await fetch(apiRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status == 200) {
            window.location.replace(apiRoute);
        }
    } catch (error) {
        alert("Error :>> ", error.message);
        console.log("Error filterSalaryData script :>> ", error.message);
        window.location.replace(apiRoute);
    }
}
