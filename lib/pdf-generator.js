import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generiert ein PDF aus dem angegebenen HTML-Element
 * @param {HTMLElement} element - Das HTML-Element, das in PDF umgewandelt werden soll
 * @param {string} filename - Der Dateiname für das PDF (ohne .pdf)
 * @returns {Promise<Blob>} - Das generierte PDF als Blob
 */
export async function generatePDF(element, filename = 'project-summary') {
  try {
    // Erstelle Canvas aus dem HTML-Element
    const canvas = await html2canvas(element, {
      scale: 2, // Für bessere Qualität
      useCORS: true,
      logging: false,
      backgroundColor: '#111827' // Dark background
    });

    // Berechne PDF-Dimensionen
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdfWidth = 210; // A4 Breite in mm
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
    
    // Erstelle PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Füge das Bild hinzu
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Speichere das PDF
    const pdfBlob = pdf.output('blob');
    
    return pdfBlob;
  } catch (error) {
    console.error('Fehler beim Generieren des PDFs:', error);
    throw error;
  }
}

/**
 * Erstellt einen Download-Link für das PDF
 * @param {Blob} pdfBlob - Das PDF als Blob
 * @param {string} filename - Der Dateiname für den Download
 */
export function downloadPDF(pdfBlob, filename = 'project-summary.pdf') {
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Sendet das PDF an eine Netlify-Funktion für Server-seitige Verarbeitung
 * @param {Blob} pdfBlob - Das PDF als Blob
 * @param {string} email - Die E-Mail-Adresse des Kunden
 * @param {object} metadata - Weitere Metadaten (Name, etc.)
 */
export async function sendPDFToServer(pdfBlob, email, metadata = {}) {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'project-summary.pdf');
    formData.append('email', email);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await fetch('/.netlify/functions/send-pdf', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Fehler beim Senden des PDFs');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Senden des PDFs:', error);
    throw error;
  }
}

