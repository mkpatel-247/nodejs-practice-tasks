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
        const result = await res.text();
        const table = $(result).find("#salary-history-table");
        const tableHtml = table.prop("outerHTML");

        $("#salary-history-table").html(tableHtml);
        history.pushState(null, "", apiRoute);
    } catch (error) {
        alert("Error :>> ", error.message);
        console.log("Error filterSalaryData script :>> ", error.message);
        window.location.replace(apiRoute);
    }
}

