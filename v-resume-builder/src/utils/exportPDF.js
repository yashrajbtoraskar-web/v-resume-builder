export async function exportToPDF(elementId, fileName = 'resume') {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  // Create a hidden clone for clean rendering
  const clone = element.cloneNode(true);
  clone.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: -9999px !important;
    width: 794px !important;
    transform: none !important;
    zoom: 1 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: -9999 !important;
    background: white !important;
  `;

  // Override ALL fonts in clone to safe system fonts
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: Arial, Helvetica, sans-serif !important;
      -webkit-font-smoothing: antialiased !important;
    }
    .tmpl-name, .tmpl-classic-name, .tmpl-exec-name, h1, h2, h3 {
      font-family: Georgia, 'Times New Roman', serif !important;
    }
  `;
  clone.appendChild(style);
  document.body.appendChild(clone);

  // Wait for everything to render
  await new Promise(resolve => setTimeout(resolve, 600));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      windowWidth: 794,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = 210;
    const pdfH = 297;
    const imgH = (canvas.height * pdfW) / canvas.width;

    if (imgH <= pdfH) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, imgH);
    } else {
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

  } catch (err) {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
    console.error('PDF export failed:', err);
  }
}
