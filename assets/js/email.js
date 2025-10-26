document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());


    var form = document.forms[0]; 

    var nameElement = form.querySelector('input[name="name"]');
    nameElement.value = "";

    var emailElement = form.querySelector('input[name="email"]');
    emailElement.value = "";

    var subjectElement = form.querySelector('input[name="subject"]');
    subjectElement.value = "";

    var messageElement = form.querySelector('textarea[name="message"]');
    messageElement.value = "";

    var checkboxElement = form.querySelector('input[name="policy"]');
    checkboxElement.checked = false;

  const res = await fetch("/.netlify/functions/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  
  const data = await res.json();

  if (data.success) {
    document.querySelector(".sent-message").style.display = "block";

    var form = document.forms[0]; 

    var nameElement = form.querySelector('input[name="name"]');
    nameElement.value = "";

    var emailElement = form.querySelector('input[name="email"]');
    emailElement.value = "";

    var subjectElement = form.querySelector('input[name="subject"]');
    subjectElement.value = "";

    var messageElement = form.querySelector('textarea[name="message"]');
    messageElement.value = "";

    var checkboxElement = form.querySelector('input[name="policy"]');
    checkboxElement.checked = false;

  } else {
    document.querySelector(".error-message").textContent = data.error || "Error al enviar el correo.";
  }
});