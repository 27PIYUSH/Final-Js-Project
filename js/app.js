function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let t1 = gsap.timeline();

  t1.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  t1.from(".line1-part1, .lineEnd h5", {
    opacity: 0,
    onstart: function () {
      // timer animation (loader)
      let h5Timer = document.querySelector(".line1-part1 h5");

      let time = 0;
      let count = setInterval(function () {
        time++;
        h5Timer.innerHTML = time;
        if (time >= 100) {
          clearInterval(count);
        }
      }, 30);
    },
  });

  t1.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });

  t1.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3,
  });

  t1.from("#page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });
  t1.to("#loader", {
    display: "none",
  });

  t1.from("#nav", {
    opacity: 0,
  });

  t1.from("#hero1 h1, #hero2 h1, #hero3 h1 , #hero3 h2, #hero4 h1", {
    y: 120,
    stagger: 0.2,
    duration: 1,
  });
  t1.from(
    "#page2, #hero1",
    {
      opacity: 0,
    },
    "-=1.6"
  );
}

function crsr() {
  document.addEventListener("mousemove", function (details) {
    gsap.to("#crsr", {
      left: details.x,
      top: details.y,
    });
  });

  // magnetic effect
  Shery.makeMagnet(".navPart2 h4");

  // cursor enlarge effect
  let cursor = document.getElementById("crsr");
  let elements = document.querySelectorAll(".navPart2 h4");

  // Function to make the cursor bigger
  function enlargeCursor() {
    cursor.style.width = "3.5vw";
    cursor.style.height = "3.5vw";
  }

  // Function to reset the cursor size
  function resetCursor() {
    cursor.style.width = "2.5vw";
    cursor.style.height = "2.5vw";
  }

  // Add event listeners to each h4 element
  elements.forEach(function (e) {
    e.addEventListener("mouseenter", enlargeCursor);
    e.addEventListener("mouseleave", resetCursor);
  });

  // Update cursor position
  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  let videoContainer = document.querySelector("#video-container");
  let video = document.querySelector("#video-container video");
  let img = document.querySelector("#video-container img");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (details) {
      gsap.to("#crsr", {
        opacity: 0,
      });
      gsap.to("#play-button", {
        left: details.x - 500,
        y: details.y - 210,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to("#crsr", {
      opacity: 1,
    });
    gsap.to("#play-button", {
      left: "70%",
      top: "-10%",
    });
  });

  let flag = 0;

  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      img.style.opacity = 0;
      video.style.opacity = 1;
      let play = document.querySelector("#play-button");
      play.innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to("#play-button", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      img.style.opacity = 1;
      video.style.opacity = 0;
      let play = document.querySelector("#play-button");
      play.innerHTML = `<i class="ri-play-large-fill"></i>`;
      gsap.to("#play-button", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function sheryAnimation() {
  Shery.imageEffect(".img-div", {
    style: 5,
    debug: false,
    gooey: true,
    config: {
      a: { value: 2.52, range: [0, 30] },
      b: { value: -0.59, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7586106934170648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.46, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 4.58, range: [0, 100] },
    },
  });
}

function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y,
    });
  });
  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
}

function footerAnimation() {
  let clutter = "";
  let clutter2 = "";

  document
    .querySelector("#footer-text h1")
    .textContent.split("")
    .forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
  document.querySelector("#footer-text h1").innerHTML = clutter;
  // console.log(clutter);

  document
    .querySelector("#footer-text h2")
    .textContent.split("")
    .forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`;
    });
  document.querySelector("#footer-text h2").innerHTML = clutter2;
  // console.log(clutter2);
  document
    .querySelector("#footer-text")
    .addEventListener("mouseenter", function () {
      gsap.to("#footer-text h1 span", {
        opacity: 0,
        stagger: 0.05,
      });
      gsap.to("#footer-text h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.1,
      });
    });

  document
    .querySelector("#footer-text")
    .addEventListener("mouseleave", function () {
      gsap.to("#footer-text h1 span", {
        opacity: 1,
        stagger: 0.1,
        delay: 0.35,
      });
      gsap.to("#footer-text h2 span", {
        opacity: 0,
        stagger: 0.05,
      });
    });
}

locomotiveAnimation();
loadingAnimation();
crsr();
sheryAnimation();
flagAnimation();
footerAnimation();
