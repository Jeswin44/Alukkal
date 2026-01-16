// Status Checker
function checkShopStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const time = hour + (minutes / 60);

    let isOpen = false;

    // Logic:
    // Mon-Sat (1-6): 9 AM (9.0) to 9 PM (21.0)
    // Sun (0): 6:30 PM (18.5) to 9 PM (21.0)

    if (day === 0) { // Sunday
        if (time >= 18.5 && time < 21) {
            isOpen = true;
        }
    } else { // Mon-Sat
        if (time >= 9 && time < 21) {
            isOpen = true;
        }
    }

    const badge = document.getElementById('status-badge');
    if (badge) {
        if (isOpen) {
            badge.className = 'badge badge-open';
            badge.innerHTML = '<i class="fa-solid fa-store"></i> Open Now';
        } else {
            badge.className = 'badge badge-closed';
            badge.innerHTML = '<i class="fa-solid fa-door-closed"></i> Closed Now';
        }
    }
}

// Order Functions
function getFormData() {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const medicines = document.getElementById('medList').value.trim();

    if (!name || !phone || !medicines) {
        alert("Please fill in Name, Phone, and Medicine details.");
        return null;
    }

    return { name, phone, address, medicines };
}

function orderViaWhatsApp() {
    const data = getFormData();
    if (!data) return;

    const phoneNumber = "919947234126"; // Updated to new order number

    // Format message
    const message = `*New Order from Website* %0A%0A` +
        `*Name:* ${data.name}%0A` +
        `*Phone:* ${data.phone}%0A` +
        `*Address:* ${data.address || 'N/A'}%0A%0A` +
        `*Order Details:*%0A${data.medicines}`;



    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}

function orderViaEmail() {
    const data = getFormData();
    if (!data) return;

    const emailTo = "thjaison@gmail.com";
    const subject = `New Medicine Order - ${data.name}`;

    const body = `New Order Details:\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Address: ${data.address || 'N/A'}\n\n` +
        `Medicines:\n${data.medicines}`;



    // Mailto logic
    const url = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
}



// Run status check on load
document.addEventListener('DOMContentLoaded', checkShopStatus);
