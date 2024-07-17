async function generatePDF() {
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const className = document.getElementById('class').value;
    const assignment = document.getElementById('assignment').value;
    const feedback = document.getElementById('feedback').value;
    const photoFile = document.getElementById('photo').files[0];

    if (!photoFile) {
        alert('Please upload a photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        const imgData = e.target.result;
        const { PDFDocument, rgb, StandardFonts } = PDFLib;

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Embed the image
        const jpgImage = await pdfDoc.embedJpg(imgData);

        // Add a page to the PDF
        const page = pdfDoc.addPage([600, 800]);

        // Set up font sizes and positioning
        const fontSize = 16;
        page.drawText(`Name: ${name}`, { x: 50, y: 750, size: fontSize });
        page.drawText(`Student ID: ${studentId}`, { x: 50, y: 730, size: fontSize });
        page.drawText(`Class: ${className}`, { x: 50, y: 710, size: fontSize });
        page.drawText(`Assignment: ${assignment}`, { x: 50, y: 690, size: fontSize });

        const feedbackFontSize = 12;
        page.drawText(`Feedback: ${feedback}`, { x: 50, y: 670, size: feedbackFontSize, maxWidth: 500 });

        // Add the image to the page
        page.drawImage(jpgImage, {
            x: 50,
            y: 450,
            width: 300,
            height: 200,
        });

        // Get the current date
        const date = new Date();
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        const dateFontSize = 10;
        page.drawText(`Date: ${formattedDate}`, { x: 50, y: 430, size: dateFontSize });

        // Encrypt the PDF with the student ID as the password
        const pdfBytes = await pdfDoc.save({
            useObjectStreams: false,
            userPassword: studentId,
        });

        // Create a Blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a download link and click it
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name}_${className}_${assignment}.pdf`.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
        link.click();
    };
    reader.readAsDataURL(photoFile);
}
