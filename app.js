// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  //   linksContainer.classList.toggle("show-links");
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`; //Sin espacios
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const backTop = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const navHeight = navbar.getBoundingClientRect().height;
  const pixelsY = window.scrollY;

  if (pixelsY > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (pixelsY > 500) {
    backTop.classList.add("show-link");
  } else {
    backTop.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const buttons = document.querySelectorAll(".scroll-link");

buttons.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //Previene comporamiento default de los links
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    //Calcula las alturas
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight; //Borramos el espacio que ocupa el navbar para que quede la posicion correcta inicial

    //Si el navbar no esta en position: fixed, significa que ocupa espacio y entonces restamos ese espacio de la posicion
    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 80) {
      //Si la altura es mayor a 80, significa que tenemos abierto el menu, entonces restamos tambien el espacio que ocupa para calcular bien la posicion del scroll
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0; //Cierra el navabar despues de clickear
  });
});
