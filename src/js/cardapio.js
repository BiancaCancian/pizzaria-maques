const links = document.querySelectorAll(".menu a");

initCart()

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => link.classList.remove("selecionado"));
    link.classList.add("selecionado");
  });
});

