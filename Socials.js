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

Socials.prototype.animate = function () {
  this.tl
    .set(this.socials, {
      top: this.startPosition().top,
      left: this.startPosition().left,
      width: (i) => this.endPosition()[i].width,
      height: (i) => this.endPosition()[i].height,
      autoAlpha: (i) => i !== 3 ? 0 : 1,
    })
    .to(this.socials, {
      autoAlpha: 1,
      duration: 1,
      ease: Sine.easeInOut,
      stagger: {
        from: "center",
        each: 0.05,
      },
    })
    .to(
      this.socials,
      {
        top: (i) => this.endPosition()[i].top,
        left: (i) => this.endPosition()[i].left,
        rotate: (i) => this.endPosition()[i].rotate,
        ease: Expo.easeInOut,
        duration: 0.8,
        stagger: {
          from: "center",
        },
      },"<")
    .to(
      this.path,
      {
        strokeDashoffset: 0,
        strokeDasharray: this.path.getTotalLength(),
        ease: Expo.easeInOut,
        duration: 0.9,
      },
      "-=0.9"
    );
};