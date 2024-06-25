function excelDateToISOString(serial) {
  const excelEpoch = new Date(Date.UTC(1900, 0, 1));
  const offsetDays = serial - 1;
  const jsDate = new Date(excelEpoch.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  return jsDate.toISOString();
}

export default excelDateToISOString