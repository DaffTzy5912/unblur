document.getElementById('upload').addEventListener('change', function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('previewImage').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('process').addEventListener('click', async function () {
    let imageFile = document.getElementById('upload').files[0];
    if (!imageFile) {
        alert('Pilih gambar terlebih dahulu.');
        return;
    }

    let formData = new FormData();
    formData.append("image", imageFile);

    try {
        let uploadResponse = await fetch("uploadImage.js", {
            method: "POST",
            body: formData,
        });

        let uploadData = await uploadResponse.json();
        let imageUrl = uploadData.url;

        let response = await fetch(`https://api.itsrose.life/image/unblur?url=${imageUrl}&apikey=YOUR_API_KEY`);
        let blob = await response.blob();

        let unblurredImageUrl = URL.createObjectURL(blob);
        document.getElementById('previewImage').src = unblurredImageUrl;
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal memproses gambar.");
    }
});
