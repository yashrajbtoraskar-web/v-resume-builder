export async function exportToPDF(elementId, fileName = 'resume') {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  // Save original styles
  const originalTransform = element.style.transform;
  const originalWidth = element.style.width;

  // Fix element for clean capture
  element.style.transform = 'none';
  element.style.width = '794px';

  await new Promise(r => setTimeout(r, 300));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: 794,
    windowWidth: 794,
  });

  // Restore styles
  element.style.transform = originalTransform;
  element.style.width = originalWidth;

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pdfW) / canvas.width;

  let heightLeft = imgH;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
  heightLeft -= pdfH;

  while (heightLeft > 0) {
    position -= pdfH;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
    heightLeft -= pdfH;
  }

  pdf.save(`${fileName.replace(/\s+/g, '_')}_resume.pdf`);
}