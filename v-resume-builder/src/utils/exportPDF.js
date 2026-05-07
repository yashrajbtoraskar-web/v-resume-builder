export async function exportToPDF(elementId, fileName = 'resume') {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  // Store original styles
  const originalTransform = element.style.transform;
  const originalPosition = element.style.position;
  const originalLeft = element.style.left;
  const originalTop = element.style.top;
  const originalZIndex = element.style.zIndex;
  const originalWidth = element.style.width;

  // Fix element for clean capture
  element.style.transform = 'none';
  element.style.position = 'fixed';
  element.style.left = '-9999px';
  element.style.top = '0px';
  element.style.zIndex = '-1';
  element.style.width = '794px';

  // Wait for fonts and layout to settle
  await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      windowWidth: 794,
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.transform = 'none';
          clonedEl.style.position = 'relative';
          clonedEl.style.left = '0';
          clonedEl.style.top = '0';
          clonedEl.style.width = '794px';
          clonedEl.style.margin = '0';
          clonedEl.style.boxShadow = 'none';
          clonedEl.style.borderRadius = '0';
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = 210; // A4 width in mm
    const pdfH = 297; // A4 height in mm
    const imgH = (canvas.height * pdfW) / canvas.width;

    if (imgH <= pdfH) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, imgH);
    } else {
      // Multi-page support
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
      heightLeft -= pdfH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH);
        heightLeft -= pdfH;
      }
    }

    pdf.save(`${(fileName || 'resume').replace(/\s+/g, '_')}_resume.pdf`);
  } finally {
    // Always restore original styles
    element.style.transform = originalTransform;
    element.style.position = originalPosition;
    element.style.left = originalLeft;
    element.style.top = originalTop;
    element.style.zIndex = originalZIndex;
    element.style.width = originalWidth;
  }
}
