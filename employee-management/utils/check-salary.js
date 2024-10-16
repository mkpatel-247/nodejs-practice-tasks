/**
 * Remove duplicate entries.
 */
export const removeDuplicate = (salaryData, month, empIds) => {
    salaryData.forEach((record) => {
        const index = empIds.indexOf(record.id);
        if (index !== -1 && record.date == month) {
            empIds.splice(index, 1);
        }
    });
    return empIds;
};
