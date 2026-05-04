export async function exportToPDF(elementId, fileName = 'resume') {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = (canvas.height * pdfW) / canvas.width;

  let position = 0;
  const pageHeight = pdf.internal.pageSize.getHeight();

  if (pdfH <= pageHeight) {
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
  } else {
    let heightLeft = pdfH;
    pdf.addImage(imgData, 'JPEG', 0, position, pdfW, pdfH);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - pdfH;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfW, pdfH);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(`${fileName.replace(/\s+/g, '_')}_resume.pdf`);
}
