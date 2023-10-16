// Open the setting box and spin the gear icon
document.querySelector(".toggle-icon").onclick = function () {
  document.querySelector(".toggle-icon i").classList.toggle("fa-spin"); //Not working
  document.querySelector(".setting-box").classList.toggle("open");
};

//Check for theme color in localstorage and applay it on the website
let colorList = document.querySelectorAll(".color-list li");
if (localStorage.getItem("themeColor") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("themeColor")
  );
  document.querySelectorAll(".color-list li").forEach((e) => {
    e.parentElement.classList.remove("active");
    if (localStorage.getItem("themeColor") === e.dataset.color) {
      e.classList.add("active");
    }
  });
}

// Make clicked color active and save it in the localstorage
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    document.querySelector(".color-list li.active").classList.remove("active");
    e.target.classList.add("active");
    window.localStorage.setItem("themeColor", e.target.dataset.color);
  });
});

//Check for the background changing option and applay it on the website
let rBackOptions = document.querySelectorAll(".rBackgroundOptions span");
let backgroundOption = true;
let interval;

if (localStorage.getItem("changRBack") !== null) {
  if (localStorage.getItem("changRBack") === "on") {
    backgroundOption = true;
    backgroundInterval();
  } else {
    backgroundOption = false;
    clearInterval(interval);
  }
  document
    .querySelector(".rBackgroundOptions span.active")
    .classList.remove("active");
  rBackOptions.forEach((e) => {
    if (e.dataset.background === localStorage.getItem("changRBack")) {
      e.classList.add("active");
    }
  });
}

//Control random backgrounds changing
rBackOptions.forEach((span) => {
  span.addEventListener("click", (e) => {
    document
      .querySelector(".rBackgroundOptions span.active")
      .classList.remove("active");
    e.target.classList.add("active");
    window.localStorage.setItem("changRBack", e.target.dataset.background);

    if (e.target.dataset.background === "on") {
      backgroundOption = true;
      backgroundInterval();
    } else {
      backgroundOption = false;
      clearInterval(interval);
    }
  });
});

//Randomly change the background
let landing_backgrounds = [
  "/images/antique-book-shelf-vintage-background.jpg",
  "/images/library-graced-by-antiquated-books-thoughtfully-curated-with-classics-precious-collectibles.jpg",
  "/images/stack-books-with-drawn-volume.jpg",
  "/images/tom-hermans-9BoqXzEeQqM-unsplash.jpg",
];
let landing = document.getElementsByClassName("landing-page")[0];
console.log(landing);
console.log(landing_backgrounds);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function backgroundInterval() {
  if (backgroundOption === true) {
    interval = setInterval(() => {
      landing.style.cssText = `background-image: url(${
        landing_backgrounds[randomNumber(0, 3)]
      })`;
    }, 10000);
  }
}
backgroundInterval();

// Adjusting skills to make animaitons

let ourSkills = document.querySelector(".skills-page");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOffsetheight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOffsetheight - windowHeight) {
    let skills = document.querySelectorAll(
      ".skills-page .container .skills-box .skill .skill-progress span"
    );
    skills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
window.onload = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOffsetheight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOffsetheight - windowHeight) {
    let skills = document.querySelectorAll(
      ".skills-page .container .skills-box .skill .skill-progress span"
    );
    skills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

// Creating a popup image when clicking on one

let myImages = document.querySelectorAll(".gallery-page .imgs-box img");
myImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);
    let popup = document.createElement("div");
    popup.classList.add("popup-box");
    let closeIcon = document.createElement("span");
    closeIcon.classList.add("close-icon");
    closeIcon.appendChild(document.createTextNode("X"));
    popup.appendChild(closeIcon);
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;
    popup.appendChild(popupImage);
    if (popupImage.alt !== null) {
      let popupText = document.createElement("h4");
      popupText.appendChild(document.createTextNode(e.target.alt));
      popup.appendChild(popupText);
    }
    document.body.appendChild(popup);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className === "close-icon") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Display bullets tip and scrolling into view
let bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document
      .querySelector(e.target.dataset.section)
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Option box display bullets and not display it
let bulletsOptions = document.querySelectorAll(".bulletsOptions span");
let navBullets = document.querySelector(".nav-bullets");
let bulletState = window.localStorage.getItem("bulletsOption");
if (bulletState !== null) {
  if (bulletState === "flex") {
    navBullets.style.display = "flex";
    bulletsOptions.forEach((span) => {
      if (span.dataset.display === "flex") {
        document
          .querySelector(".bulletsOptions span.active")
          .classList.remove("active");
        span.classList.add("active");
      }
    });
  } else {
    navBullets.style.display = "none";
    bulletsOptions.forEach((span) => {
      if (span.dataset.display === "none") {
        document
          .querySelector(".bulletsOptions span.active")
          .classList.remove("active");
        span.classList.add("active");
      }
    });
  }
}
console.log(bulletsOptions);
console.log(navBullets);
bulletsOptions.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "flex") {
      navBullets.style.display = "flex";
      window.localStorage.setItem("bulletsOption", "flex");
    } else {
      navBullets.style.display = "none";
      window.localStorage.setItem("bulletsOption", "none");
    }
    document
      .querySelector(".bulletsOptions span.active")
      .classList.remove("active");
    e.target.classList.add("active");
  });
});

// Reset Options
document.querySelector(".reset-options").onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};

//toggle menu

let tlinks = document.querySelector(".header .links");
let toggleBtn = document.querySelector(".toggle-menu");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  tlinks.classList.toggle("open");
  toggleBtn.classList.toggle("toggled");
};

document.addEventListener("click", (e) => {
  if (e.target !== tlinks && e.target !== toggleBtn) {
    if (tlinks.classList.contains("open")) {
      tlinks.classList.toggle("open");
      toggleBtn.classList.toggle("toggled");
    }
  }
});

tlinks.onclick = function (e) {
  e.stopPropagation();
};
