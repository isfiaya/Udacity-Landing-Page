// Define Global Variables
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('a[href*="#"]');
const scrollUp = document.getElementById('scroll-up');
const pageHeader = document.getElementById('page__header');
const btnToggle = document.getElementById('btn__toggle');
const navbarList = document.getElementById("navbar__list");
let isShow = false

// build the nav

for (let i = 1; i <= sections.length; i++) {
  const navbarList = document.getElementById('navbar__list')
  const listItem = document.createElement('li');
  const linkItem = document.createElement("a")
  const numberSection = `#section${i}`
  linkItem.classList.add('menu__link')
  linkItem.setAttribute("href", numberSection)
  linkItem.innerHTML = `Section${i}`;
  listItem.append(linkItem);
  navbarList.appendChild(listItem)
}

// Scroll to section on link click

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Set sections as active

function scrollActive() {
  const scrollY = window.pageYOffset
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 250;
    const sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.navbar__menu a[href*=' + sectionId + ']').classList.add('active-link')
    }
    else {
      document.querySelector('.navbar__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

// SHOW SCROLL UP

function scrollTop() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 560) {
    scrollUp.classList.add('show-scroll')
  }
  else {
    scrollUp.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', scrollTop)

// When the user clicks on the button, scroll to the top of the document

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
scrollUp.addEventListener('click', topFunction)

// Toggle Nav bar 

btnToggle.addEventListener('click', () => {
  navbarList.classList.toggle("show-list");
  isShow = !isShow
})


// Hide fixed navigation bar while not scrolling 

let timer = null;
window.addEventListener('scroll', function () {

  if (timer !== null) {
    pageHeader.style.top = "0";
    clearTimeout(timer)
  }

  if (window.pageYOffset > 300) {
    timer = setTimeout(function () {
      pageHeader.style.top = "-60px";
      keepToggle()
    }, 1500);
  }

});

// On a small screen when click for the burger and show the link the nav will still exist

const keepToggle = () => {
  if (isShow) {
    pageHeader.style.top = "0";
  }
}


// Set class to active state on the navigation items when a section is in the viewport.

function sectionActive() {
  const scrollY = window.pageYOffset
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 250;
    const sectionId = current.getAttribute('data-nav')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('main section[data-nav*=' + sectionId + ']').classList.add('your-active-class')
    }
    else {
      document.querySelector('main section[data-nav*=' + sectionId + ']').classList.remove('your-active-class')
    }
  })
}
window.addEventListener('scroll', sectionActive)