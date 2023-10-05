function getRect(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    right: rect.right + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

function onResize(cb) {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener("resize", function () {
    if (windowWidth !== window.innerWidth ||windowHeight !== window.innerHeight) {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      cb();
    }
  });
}
