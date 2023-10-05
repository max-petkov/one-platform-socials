function Socials() {
  this.socials = document.querySelectorAll(".social");
  this.rects = document.querySelectorAll(".rects rect");
  this.path = document.querySelector(".path");
}

Socials.prototype.startPosition = function () {   
    const rightSideRect4 = getRect(this.rects[3]).right;
    const leftSideRect5 = getRect(this.rects[4]).left;
    const topSideRect4 = getRect(this.rects[3]).top;
    const center = rightSideRect4 + ((rightSideRect4 - leftSideRect5) / 2);

    return {
        top : topSideRect4,
        left : center,
    }
};

Socials.prototype.endPosition = function () {
    const positions = [];
    this.rects.forEach((rect, i) => {
        positions.push({
            rectIndex:i,
            top : getRect(rect).top,
            left : getRect(rect).left,
            width : getRect(rect).width,
            height : getRect(rect).height,
            rotate: this.getRotation(rect)
        })
    });
    return positions;
};

Socials.prototype.getRotation = function (rect) {
    let degree = 0;
    if(!rect.getAttribute("transform")) return degree;
    
    degree = Number(rect.getAttribute("transform").split(" ")[0].split("rotate(").join(""));
    return degree;
};

Socials.prototype.animate = function() {
    const tl = gsap.timeline();

    tl
    .set(this.socials, {
        top: () => this.startPosition().top + 256,
        left: () => this.startPosition().left + gsap.utils.random(-128, 128),
        width: (i) => this.endPosition()[i].width,
        height: (i) => this.endPosition()[i].height,
        autoAlpha: 1,
        scale: 0,
    })
    .to(this.path, {
        strokeDashoffset: 0,
        ease: Sine.easeInOut,
        duration: 0.9,
    })
    .to(this.socials, {
        top: () => this.startPosition().top + gsap.utils.random(-3, 3),
        left: () => this.startPosition().left + gsap.utils.random(-3, 3),
        autoAlpha: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: Sine.easeInOut
    }, "<")
    .to(this.socials, {
        delay: 0.4,
        top: (i) => this.endPosition()[i].top,
        left: (i) => this.endPosition()[i].left,
        rotate: (i) => this.endPosition()[i].rotate,
        ease: Sine.easeInOut,
        duration: 0.6,
        stagger: {
            from: "center",
            each: 0.07
        }
    }, "<17%")
}

const socials = new Socials()
socials.animate();

onResize(function() {
    socials.animate();
});