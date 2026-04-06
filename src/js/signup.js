import { postData, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const form = document.querySelector("#signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const address = document.querySelector("#address").value;
  const email = document.querySelector("#email").value;
  const avatarFile = document.querySelector("#avatar").files[0];

  let avatar = "";

  if (avatarFile) {
    avatar = await toBase64(avatarFile);
  }

  const user = {
    name,
    address,
    email,
    avatar,
  };

  // send to API
  await postData("/users", user);

  // save locally
  setLocalStorage("current-user", user);

  alert("Account created successfully!");

  window.location.href = "/";
});

// convert image to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
