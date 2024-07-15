const messageInput = document.getElementById("messageInput");
const generateBtn = document.getElementById("generateBtn");
const qrImg = document.getElementById("qrImg");
const qrCodeContainer = document.getElementById("qr-code");
const clearBtn = document.getElementById("clear");

generateBtn.addEventListener("click", generateQRCode);
messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        generateQRCode();
    }
});
clearBtn.addEventListener("click", clearInput);

function generateQRCode() {
    const message = messageInput.value.trim();
    if (!message) {
        alert("Please enter something...");
    } else {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(message)}`;
        qrImg.src = qrCodeUrl;
        
        // Fetch the QR code image and create a download link
        fetch(qrCodeUrl)
            .then(res => res.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = objectURL;
                link.download = "text_To_QR.png";
                link.textContent = "Download QR";
                link.className = "download";

                // Clear previous download link if exists
                const previousLink = qrCodeContainer.querySelector('.download');
                if (previousLink) {
                    qrCodeContainer.removeChild(previousLink);
                }

                qrCodeContainer.appendChild(link);
            });

        // Clear the input field
        messageInput.value = "";
    }
}

function clearInput() {
    messageInput.value = "";
    qrImg.src = "";
    
    // Clear the download link if exists
    const previousLink = qrCodeContainer.querySelector('.download');
    if (previousLink) {
        qrCodeContainer.removeChild(previousLink);
    }
}

