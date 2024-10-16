export const employeeWise = (data, empId) => {
    return data.filter((record) => record.id == empId);
};
export const monthWise = (data, month) => {
    return data.filter((record) => record.date == month);
};

export const filterEmployeeAndMonth = (data, empId, month) => {
    return data.filter((record) => record.date == month && record.id == empId);
};
