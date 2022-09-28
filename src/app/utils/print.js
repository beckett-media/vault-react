export const printSection = (elementId) => {
  const printwin = window.open('');
  printwin.document.write(document.getElementById(elementId).innerHTML);
  printwin.stop();
  printwin.print();
  printwin.close();
};
