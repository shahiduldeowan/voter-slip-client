const isExcelFileByType = (fileType) => {
  if (!fileType) {
    return false;
  }

  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  return allowedTypes.includes(fileType);
};

export { isExcelFileByType };
