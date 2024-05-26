async function processImage() {
    const input = document.getElementById('imageInput');
    if (input.files.length === 0) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
        console.log("Sending request to /process_image");  // Debugging statement
        const response = await fetch('/process_image', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Received data:", data);  // Debugging statement
        document.getElementById('results').innerText = JSON.stringify(data.results, null, 2);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('results').innerText = 'Error processing image.';
    }
}
