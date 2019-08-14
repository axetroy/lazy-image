const defaultOffset = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

export function isInViewport(
  element: HTMLElement,
  options = { offset: defaultOffset, threshold: 0 }
): boolean {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = element.getBoundingClientRect();

  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height
  };

  return (
    intersection.t > options.offset.top + threshold.y &&
    intersection.r > options.offset.right + threshold.x &&
    intersection.b > options.offset.bottom + threshold.y &&
    intersection.l > options.offset.left + threshold.x
  );
}
