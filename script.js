function generatePDF() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
    const className = document.getElementById('studentid').value;
    const assignment = document.getElementById('assignment').value;
    const feedback = document.getElementById('feedback').value;
    const photoFile = document.getElementById('photo').files[0];

    if (!photoFile) {
        alert('Please upload a photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imgData = e.target.result;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(20, 20, `Name: ${name}`);
        doc.text(20, 30, `Student ID: ${studentid}`);
        doc.text(20, 40, `Class: ${className}`);
        doc.text(20, 50, `Assignment: ${assignment}`);
        doc.text(20, 60, `Feedback: ${feedback}`);
        doc.addImage(imgData, 'JPEG', 20, 70, 150, 150);

        // Construct filename using name, class, and assignment values
        const filename = `${name}_${className}_${assignment}.pdf`;

        // Replace spaces with underscores and remove any non-alphanumeric characters except for underscores and dots
        const sanitizedFilename = filename.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');

        doc.save(sanitizedFilename);
    };
    reader.readAsDataURL(photoFile);
}
