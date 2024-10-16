export const filterData = (data, empId = null, month = null) => {
    return data.filter((record) => {
        const matchesEmpId = empId ? record.id == empId : true; // Check if empId is provided
        const matchesMonth = month ? record.month == month : true; // Check if month is provided
        return matchesEmpId && matchesMonth; // Return true if both conditions are met
    });
};