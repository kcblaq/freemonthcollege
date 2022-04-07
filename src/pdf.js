import * as html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const downloadAsPDF = async (img, pdfName, ext) => {
  const canvas = await html2canvas(img, {
    logging: true,
    letterRendering: 1,
    allowTaint: false,
    useCORS: true,
    scale: 4,
    scrollY: -window.scrollY,
  });
  const pdf = new JsPDF('p', 'mm', 'a4');
  const ratio = canvas.width / canvas.height;
  const width = pdf.internal.pageSize.getWidth();
  const height = width / ratio;

  pdf.addImage(
    canvas.toDataURL('image/png'),
    'SVG',
    0,
    0,
    width,
    height,
    null,
    'FAST',
    0
  );
  pdf.save(`${pdfName}.pdf`);
};

export const downloadAsPDF2 = async (img, pdfName, ext) => {
  const canvas = await html2canvas(img, {
    allowTaint: false,
    useCORS: true,
  });
  const data = canvas.toDataURL('image/png');

  const pdf = new JsPDF();
  const pageHeight = 295;
  const pdfWidth = 210;
  let position = 0;
  const imgProperties = pdf.getImageProperties(data);
  // const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  let heightLeft = pdfHeight;

  pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(`${pdfName}.pdf`);
};