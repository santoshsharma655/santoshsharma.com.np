document.addEventListener("DOMContentLoaded", () => {

  /* ========= HOME LOGIN ========= */
  const modal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const closeBtn = document.getElementById("closeBtn");
  const enterBtn = document.getElementById("enterBtn");

  const users = [
    { reg:"283435", pass:"124", dob:"2006-01-01" },
    { reg:"313121", pass:"431", dob:"2008-02-02" },
    { reg:"332244", pass:"256", dob:"2009-06-05" }
  ];

  // Open modal
  if (loginBtn && modal) {
    loginBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  // Close modal
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Login validation
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const r = document.getElementById("reg").value;
      const p = document.getElementById("pass").value;
      const d = document.getElementById("dob").value;
      const msg = document.getElementById("msg");

      const valid = users.find(u => u.reg === r && u.pass === p && u.dob === d);

      if(valid){
        msg.style.color = "green";
        msg.innerHTML = "✅ Login Successful";
      } else {
        msg.style.color = "red";
        msg.innerHTML = "❌ Invalid Details";
      }
    });
  }

  /* ========= READ MORE (LIFESTYLE CARDS) ========= */
  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".lifestyle-card");
      if (!card) return;

      const fullText = card.querySelector(".full-text");
      if (!fullText) return;

      const isVisible = window.getComputedStyle(fullText).display !== "none";

      if (isVisible) {
        fullText.style.display = "none";
        btn.textContent = "Read More";
      } else {
        fullText.style.display = "block";
        btn.textContent = "Read Less";
      }
    });
  });

});



function openQRForm() {
  document.getElementById("qrForm").style.display = "block";
}

function generateQR() {

  const data = `
Name: ${name.value}
Email: ${email.value}
Phone: ${phone.value}
Blood Group: ${blood.value}
Nationality: ${nation.value}
Qualification: ${qual.value}
Registration No: ${regno.value}
Password: ${password.value}
DOB: ${dob.value}
`;

  const qrBox = document.getElementById("qrResult");
  qrBox.innerHTML = "";

  const qr = new QRCode(qrBox, {
    text: data,
    width: 200,
    height: 200
  });

  setTimeout(() => {
    const img = qrBox.querySelector("img");
    document.getElementById("downloadQR").href = img.src;
    document.getElementById("downloadQR").style.display = "block";
  }, 500);
}
// Open/Close Form
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const billFormContainer = document.getElementById('billFormContainer');
const billForm = document.getElementById('billForm');

openFormBtn.addEventListener('click', () => {
    billFormContainer.style.display = 'block';
    billPreviewContainer.style.display = 'none';
});

closeFormBtn.addEventListener('click', () => {
    billFormContainer.style.display = 'none';
});

// Add Particular Row
const addRowBtn = document.getElementById('addRowBtn');
const particularTableBody = document.querySelector('#particularTable tbody');

addRowBtn.addEventListener('click', () => {
    const particular = document.getElementById('particularInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value);

    if(particular && amount){
        const rowCount = particularTableBody.rows.length + 1;
        const row = particularTableBody.insertRow();
        row.insertCell(0).textContent = rowCount;
        row.insertCell(1).textContent = particular;
        row.insertCell(2).textContent = amount.toFixed(2);

        document.getElementById('particularInput').value = '';
        document.getElementById('amountInput').value = '';
    }
});

// Number to Words
function numberToWords(num) {
    const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
               'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    const b = ['','Ten','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];

    if(num === 0) return 'Zero';

    function inWords(n){
        if(n < 20) return a[n];
        if(n < 100) return b[Math.floor(n/10)] + (n%10 ? ' '+a[n%10] : '');
        if(n < 1000) return a[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' and '+inWords(n%100) : '');
        if(n < 1000000) return inWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' '+inWords(n%1000) : '');
        return inWords(Math.floor(n/1000000)) + ' Million' + (n%1000000 ? ' '+inWords(n%1000000) : '');
    }

    return inWords(num);
}

// Generate Bill
const generateBtn = document.getElementById('generateBtn');
const billPreviewContainer = document.getElementById('billPreviewContainer');
const billCanvas = document.getElementById('billCanvas');
const downloadBill = document.getElementById('downloadBill');

generateBtn.addEventListener('click', () => {
    // Hide form
    billFormContainer.style.display = 'none';
    billPreviewContainer.style.display = 'block';

    // Canvas
    const ctx = billCanvas.getContext('2d');
    const canvasWidth = 600;
    const canvasHeight = 800;
    billCanvas.width = canvasWidth;
    billCanvas.height = canvasHeight;
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';

    const orgName = document.getElementById('orgName').value;
    const orgAddress = document.getElementById('orgAddress').value;
    const billNo = document.getElementById('billNo').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const date = document.getElementById('billDate').value;
    const receivedFrom = document.getElementById('receivedFrom').value;
    const receivedAddress = document.getElementById('receivedAddress').value;
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    // Header
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(orgName, canvasWidth/2, 40);
    ctx.font = '16px Arial';
    ctx.fillText(orgAddress, canvasWidth/2, 65);
    ctx.fillText('Bill No: '+billNo+'   Date: '+date, canvasWidth/2, 90);

    // Received From
    ctx.textAlign = 'left';
    ctx.fillText('Received From: '+receivedFrom, 30, 130);
    ctx.fillText('Address: '+receivedAddress, 30, 155);
    ctx.fillText('Mobile: '+mobileNo, 30, 180);

    // Table Header
    ctx.fillText('SN', 50, 220);
    ctx.fillText('Particular', 120, 220);
    ctx.fillText('Amount', 450, 220);

    let y = 250;
    let total = 0;
    particularTableBody.querySelectorAll('tr').forEach((row, i) => {
        const sn = row.cells[0].textContent;
        const particular = row.cells[1].textContent;
        const amount = parseFloat(row.cells[2].textContent);
        ctx.fillText(sn, 50, y);
        ctx.fillText(particular, 120, y);
        ctx.fillText(amount.toFixed(2), 450, y);
        total += amount;
        y += 25;
    });

    if(discount > 0){
        ctx.fillText('Discount: '+discount.toFixed(2), 450, y);
        total -= discount;
        y += 25;
    }

    ctx.font = 'bold 16px Arial';
    ctx.fillText('Total: '+total.toFixed(2), 450, y);
    y += 25;
    ctx.font = '16px Arial';
    ctx.fillText('Amount in Words: '+numberToWords(total)+' Only', 30, y);
});

// Download Bill
downloadBill.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'bill.png';
    link.href = billCanvas.toDataURL();
    link.click();
});

document.addEventListener("DOMContentLoaded", function () {

  const openBtn = document.getElementById("openSignGen");
  const panel = document.getElementById("signPanel");
  const generateBtn = document.getElementById("generateSign");
  const resultBox = document.getElementById("signResults");
  const nameInput = document.getElementById("signName");

  // Open panel
  openBtn.addEventListener("click", () => {
    panel.style.display = "block";
  });

  // Signature fonts (handwritten feel)
  const fonts = [
    "cursive",
    "'Brush Script MT', cursive",
    "'Segoe Script', cursive",
    "'Lucida Handwriting', cursive",
    "'Comic Sans MS', cursive"
  ];

  // Generate signatures
  generateBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (name === "") {
      alert("Please enter your name");
      return;
    }

    resultBox.innerHTML = "";

    fonts.forEach((font, index) => {
      const card = document.createElement("div");
      card.className = "sign-card";

      const sign = document.createElement("div");
      sign.className = "sign-text";
      sign.style.fontFamily = font;
      sign.textContent = name;

      const btn = document.createElement("button");
      btn.className = "download-btn";
      btn.textContent = "Download";

      btn.addEventListener("click", () => {
        downloadSignature(name, font, index);
      });

      card.appendChild(sign);
      card.appendChild(btn);
      resultBox.appendChild(card);
    });
  });

  // Download function
  function downloadSignature(text, font, index) {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 200;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = "60px " + font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "signature_" + (index + 1) + ".png";
    link.click();
  }

});

