async function loadPartial(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(file);
  if (!res.ok) throw new Error(`Failed to load ${file}`);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  // cookie banner (only if exists on the page)
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");

  if (cookieBanner && acceptBtn) {
    if (!localStorage.getItem("cookiesAccepted")) {
      cookieBanner.style.display = "block";
    }

    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  }

  // navbar/footer injection
  try {
    await loadPartial("#navbar", "/partials/navbar.html");
    await loadPartial("#footer", "/partials/footer.html");
  } catch (err) {
    console.error(err);
  }
});
