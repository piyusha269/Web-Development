document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const msgBox = document.getElementById("form-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let errorMsg = "";

    // Validations
    if (name.length < 3) {
      errorMsg = "⚠️ Full name must be at least 3 characters.";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      errorMsg = "⚠️ Invalid email format.";
    } else if (!/^\d{10}$/.test(phone)) {
      errorMsg = "⚠️ Phone number must be exactly 10 digits.";
    } else if (message.length < 5) {
      errorMsg = "⚠️ Message must be at least 5 characters long.";
    }

    if (errorMsg) {
      msgBox.textContent = errorMsg;
      msgBox.style.color = "red";
    } else {
      msgBox.textContent = "✅ Your message was sent successfully!";
      msgBox.style.color = "green";
      form.reset();
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const text = "Welcome to Piyush Academy";
  const typingText = document.getElementById("typing-text");
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
});
