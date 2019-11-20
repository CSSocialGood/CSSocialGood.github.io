var footer = document.querySelector("footer");
var navlinks = document.querySelectorAll("nav a");

var nav = document.querySelector("nav");
var menubtn = document.querySelector(".menubtn");
var menuisopen = false;
var arrow = document.querySelector(".arrow");

var story = document.querySelector("#story");
var toObserve = document.querySelectorAll(".to-observe");
var images = document.querySelectorAll("img");
var copy = document.querySelectorAll(".copysec");

/*
var profiles = document.querySelectorAll(".profile");

profiles.forEach(profile => {
  profile.addEventListener("click", function() {
    toggleProfile(profile);
  });
});

*/

/* function toggleProfile(element) {
  if (element.classList.contains("expanded")) {
    element.classList.remove("expanded");
  } else {
    element.classList.add("expanded");
  }
} */

const config = {
  rootMargin: '-50px 0px -55%'
}

const config2 = {
  rootMargin: '-50px 0px -15%'
}

const config3 = {
  rootMargin: '20px 0px'
}

menubtn.addEventListener("click", function() {
  if (menuisopen) {
    nav.style.transform = "translateX(200px)";
    menubtn.style.transform = "";
    menuisopen = false;
  } else {
    nav.style.transform = "translateX(0px)";
    menubtn.style.transform = "translateX(-200px)";
    menuisopen = true;
  }
});

arrow.addEventListener("click", function() {
  story.scrollIntoView();
})

function activate(el) {
  navlinks.forEach(link_ => {
    link_.classList.remove("active");
  });
  el.classList.add("active");
}

latestKnownScrollY = window.scrollY;
var latestKnownScrollY = 0,
  ticking = false;

function onScroll() {
  latestKnownScrollY = window.scrollY;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

function update() {

  ticking = false;

  var currentScrollY = latestKnownScrollY;

  // moveStars();
  // moveLayers();
  footer.style.transform = "translateX(" + -2 * latestKnownScrollY + "px)";
}

// window.addEventListener('scroll', onScroll, false);

let lazyloader = new IntersectionObserver(function(entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.tagName == "IMG") {
      entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
      entry.target.style.transform = "";
      entry.target.style.opacity = "1";
      this.unobserve(entry.target);
    } else if (entry.isIntersecting && entry.target.tagName == "DIV") {
      entry.target.style.opacity = "1";
    }
  })
}, config3)

images.forEach(image => {
  lazyloader.observe(image);
});
copy.forEach(copysec => {
  lazyloader.observe(copysec);
})

let footerobsv = new IntersectionObserver(function(entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id == "story") {
      footer.style.transform = "translateX(-2000px)";
      arrow.style.transform = "translateY(1000px)";
      arrow.style.height = "500px";
    } else if (entry.isIntersecting && entry.target.id == "landing") {
      footer.style.transform = "translateX(0px)";
      arrow.style.transform = "translateY(0px)";
      arrow.style.height = "100px";
    }
  })
}, config2);

requestAnimationFrame(update);

let observer = new IntersectionObserver(function(entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activate(navlinks[entry.target.getAttribute("data-index")]);
      if (entry.target.getAttribute("data-index") == 3 && window.innerWidth > 999) {
        navlinks.forEach(link => {
          link.style.color = "#c5c5c5";
        });
      } else {
        navlinks.forEach(link => {
          link.style.color = "black";
        });
      }
    }
  });
}, config);

toObserve.forEach(item => {
  observer.observe(item);
  footerobsv.observe(item);
})