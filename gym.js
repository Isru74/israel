document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const message = document.getElementById("message");

  // Ensure the form and message elements exist
  if (!form || !message) return;

  form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Access form fields with nullish coalescing to set default values if missing
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const paymentRef = document.getElementById("paymentRef")?.value.trim() || "";

      // Validate input
      if (!name || !email || !paymentRef) {
          message.textContent = "All fields are required.";
          message.style.color = "red";
          return;
      }

      try {
          // Make a POST request to the backend API running on port 5000
          const response = await fetch("http://localhost:5000/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, paymentRef })
          });

          // Handle non-OK responses
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }

          const result = await response.json();

          // Display success or error message based on the backend response
          if (result.success) {
              message.textContent = "Registration successful! Thank you.";
              message.style.color = "green";
          } else {
              message.textContent = result.error || "An error occurred.";
              message.style.color = "red";
          }

          // Reset the form
          form.reset();
      } catch (error) {
          console.error("Error:", error);
          message.textContent = "Error connecting to server.";
          message.style.color = "";
      }
  });
});
// Make a request to the backend
fetch('/api/hello')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log the response from the backend
    document.getElementById('output').innerText = data.message;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
