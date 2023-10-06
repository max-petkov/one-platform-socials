function Socials() {
  this.socials = document.querySelectorAll(".social");
  this.rects = document.querySelectorAll(".rects rect");
  this.path = document.querySelector(".path");
  this.tl = gsap.timeline();
}

Socials.prototype.startPosition = function () {
  const rightSideRect4 = getRect(this.rects[3]).right;
  const leftSideRect5 = getRect(this.rects[4]).left;
  const topSideRect4 = getRect(this.rects[3]).top;
  const center = rightSideRect4 + (rightSideRect4 - leftSideRect5) / 2;

  return {
    top: topSideRect4,
    left: center,
  };
};

Socials.prototype.endPosition = function () {
  const positions = [];
  this.rects.forEach((rect, i) => {
    positions.push({
      rectIndex: i,
      top: getRect(rect).top,
      left: getRect(rect).left,
      width: getRect(rect).width,
      height: getRect(rect).height,
      rotate: this.getRotation(rect),
    });
  });
  return positions;
};

Socials.prototype.getRotation = function (rect) {
  let degree = 0;
  if (!rect.getAttribute("transform")) return degree;

  degree = Number(
    rect.getAttribute("transform").split(" ")[0].split("rotate(").join("")
  );
  return degree;
};

Socials.prototype.magnetic = function () {};

Socials.prototype.animate = function () {
  this.tl
    .set(this.socials, {
      top: () => this.startPosition().top,
      left: () => this.startPosition().left,
      width: (i) => this.endPosition()[i].width,
      height: (i) => this.endPosition()[i].height,
      autoAlpha: 0,
      scale: 0.5,
    })
    .to(this.socials, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.5,
      ease: Expo.easeInOut,
      stagger: 0.1,
    })
    .to(
      this.socials,
      {
        delay: 0.4,
        top: (i) => this.endPosition()[i].top,
        left: (i) => this.endPosition()[i].left,
        rotate: (i) => this.endPosition()[i].rotate,
        ease: Expo.easeInOut,
        duration: 0.8,
        stagger: {
          from: "center",
        },
      },
      "-=1.1"
    )
    .to(
      this.path,
      {
        strokeDashoffset: 0,
        strokeDasharray: this.path.getTotalLength(),
        ease: Circ.easeInOut,
        duration: 0.9,
      },
      "-=0.65"
    );
};
// Socials.prototype.animate = function () {
//   this.tl.set(this.socials, {
//     top: () => this.startPosition().top + 256,
//     left: () => this.startPosition().left + gsap.utils.random(-128, 128),
//     width: (i) => this.endPosition()[i].width,
//     height: (i) => this.endPosition()[i].height,
//     autoAlpha: 1,
//     scale: 0,
//   })
//     .to(
//       this.socials,
//       {
//         top: () => this.startPosition().top + gsap.utils.random(-3, 3),
//         left: () => this.startPosition().left + gsap.utils.random(-3, 3),
//         autoAlpha: 1,
//         scale: 1,
//         stagger: 0.05,
//         duration: 0.4,
//         ease: Sine.easeInOut,
//         stagger: {
//           from: "center",
//           each: 0.07,
//         },
//       },
//       "<"
//     )
//     .to(
//       this.socials,
//       {
//         delay: 0.4,
//         top: (i) => this.endPosition()[i].top,
//         left: (i) => this.endPosition()[i].left,
//         rotate: (i) => this.endPosition()[i].rotate,
//         ease: Sine.easeInOut,
//         duration: 0.6,
//         stagger: {
//           from: "center",
//           each: 0.06,
//         },
//       },
//       "-=1"
//     )
//     .to(
//       this.path,
//       {
//         strokeDashoffset: 0,
//         strokeDasharray: this.path.getTotalLength(),
//         ease: Circ.easeInOut,
//         duration: 0.9,
//       },
//       "-=0.65"
//     );
// };