const messageInput = document.getElementById("messageInput");
const generateBtn = document.getElementById("generateBtn");
const qrImg = document.getElementById("qrImg");
const download = document.getElementById("download");
const qr_code = document.getElementById("qr-code");
const clear = document.getElementById("clear")

generateBtn.addEventListener("click", generateQRCode);
messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        generateQRCode();
    }
});
let img;
function generateQRCode() {
    const message = messageInput.value.trim();
    if (!message) {
        alert("Please enter something...");
    } else {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(message)}`;
        qrImg.src = qrCodeUrl;
        
        // download.setAttribute("href",qrImg.png);
        //  download.setAttribute("download", qrImg.png);
         fetch(qrCodeUrl).then((res)=> res.blob()).then((href =>{
            const objectURL = URL.createObjectURL(href);
            const link = document.createElement('a');
            link.href = objectURL;
            link.download="text_To_Qr";
            link.textContent = "Download QR";
            link.className = "download";
            qr_code.appendChild(link);
         })) 
    }
}


function clearInput(){
    messageInput.value = "";
}
