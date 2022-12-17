import PocketBase from "https://unpkg.com/pocketbase@0.8.3/dist/pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get the fields
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (!email.value || !password.value) {
    alert("missing field");
    return;
  }

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email.value, password.value);

    console.log("[LOGIN.JS] authData", authData);
    console.log("[LOGIN.JS] pb.authStore", pb.authStore);

    // redirect to index page
    window.location.replace("http://localhost:3000/");
  } catch (error) {
    alert(error);
    email.value = "";
    password.value = "";
  }
});
