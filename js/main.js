const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // Toggle the 'show-menu' class on the navigation menu
      nav.classList.toggle("show-menu");
    });
  } else {
    console.error("Toggle or nav element not found");
  }
};

showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector("#nav_menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector("#nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=======Remove The Size and print on A4 sheet===============*/
function scaleCv() {
  document.body.classList.add("scale-cv");
}

/*============Remove the size when the CV is downloaded===========*/
function removeScale() {
  document.body.classList.remove("scale-cv");
}

/*===============Generate PDF ============================*/
//PDF Generate area
let areaCv = document.getElementById("area-cv");
let resumeButton = document.getElementById("resume-button");

/* 'theme-button'*/
/* Html2PDF options*/
let opt = {
  margin: 0,
  filename: "myResume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

/*======== Function to call areaCv and HTML2PDF options=====*/
function generateResume() {
  html2pdf(areaCv, opt);
}

/*====when the button is clicked it executes the three functions== */
resumeButton.addEventListener("click", () => {
  //1.The class .scale-cv is added to the body, where it reduces the size of the body
  scaleCv();

  //2.The PDF is generated
  generateResume();

  //3.The .scale-cv class is removed from the body after 5 seconds to return
  setTimeout(removeScale, 5000);
});

//Need to add in main doc//this coundown successfully

document.addEventListener("DOMContentLoaded", function () {
  // Set the initial number of years
  let currentYears = 0;
  const yearsElement = document.getElementById("experience-years");

  // Function to update the years and format it with leading zeros
  function updateYears() {
    if (currentYears < 8) {
      yearsElement.textContent = currentYears.toString().padStart(2, "0");
    } else {
      yearsElement.textContent = "Total 8 Years";
    }
  }

  // Update the years every second until 8 years
  const intervalId = setInterval(function () {
    if (currentYears < 8) {
      currentYears++;
      updateYears();
    } else {
      clearInterval(intervalId); // Stop the interval when it reaches 8 years
    }
  }, 800); // Adjust the interval duration as needed
});
