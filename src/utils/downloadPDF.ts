// src/utils/downloadPdf.ts

/**
 * Creates an empty PDF blob and triggers a download.
 * @param filename The name for the downloaded file (e.g., 'document.pdf').
 */
export const downloadEmptyPdf = (filename: string = 'document.pdf') => {
  try {
    // Create a simple empty PDF structure (minimal valid PDF)
    // This is a very basic structure and might not be parsed by all readers,
    // but it serves the purpose of creating a file with .pdf extension and type.
    const pdfContent = '%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 0>>endobj\nxref\n0 3\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\ntrailer<</Size 3/Root 1 0 R>>\nstartxref\n101\n%%EOF';

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Set the desired file name
    document.body.appendChild(a);
    a.click(); // Programmatically click the link to trigger download
    document.body.removeChild(a); // Clean up the temporary link

    URL.revokeObjectURL(url); // Clean up the object URL
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to download the file.'); // Inform the user if download fails
  }
};

// Пример использования:
// <button onClick={() => downloadEmptyPdf('my_document.pdf')}>Скачать документ</button>