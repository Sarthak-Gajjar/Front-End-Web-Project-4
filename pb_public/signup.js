import PocketBase from "https://unpkg.com/pocketbase@0.8.3/dist/pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get the fields
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("passwordConfirm");

  if (!email.value || !password.value || !passwordConfirm.value) {
    alert("missing field");
    return;
  }

  const data = {
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
  };

  try {
    const record = await pb.collection("users").create(data);
    alert("successfully created user");
    console.log(record);

    // reset the fields
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";

    // redirect to log in
    window.location.replace("http://localhost:3000/login.html");
  } catch (error) {
    alert(error);
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
  }
});
