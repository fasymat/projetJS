document
  .getElementById("login-form-submit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const mail = document.getElementById("username-field").value;
    const password = document.getElementById("password-field").value;
    const errorMessage = document.getElementById("error-message");
    console.log(mail);
    console.log(password);
    console.log("clicll");
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email: mail, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.userId) {
          // Login credentials are valid, store the token in localStorage
          const token = data.token;
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage:", token);
          window.location.href = "index.html";
        } else {
          console.log("Invalid login credentials");
          errorMessage.style.display = "flex";
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  });
