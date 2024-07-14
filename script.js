function generatePDF() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
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
        doc.text(20, 30, `Class: ${className}`);
        doc.text(20, 40, `Assignment: ${assignment}`);
        doc.text(20, 50, `Feedback: ${feedback}`);
        doc.addImage(imgData, 'JPEG', 20, 60, 150, 150);

        doc.save('formative_feedback.pdf');
    };
    reader.readAsDataURL(photoFile);
}
