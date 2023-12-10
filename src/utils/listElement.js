export function findClosestIndex(x, y) {
  const elements = document.elementsFromPoint(x, y);

  const liElements = elements.filter((element) => element.tagName.toLowerCase() === "li");

  if (liElements.length === 0) {
    return -1;
  }

  const closestLi = liElements.reduce((closest, current) => {
    const rectClosest = closest.getBoundingClientRect();
    const rectCurrent = current.getBoundingClientRect();
    const distanceClosest = Math.sqrt((x - rectClosest.left) ** 2 + (y - rectClosest.top) ** 2);
    const distanceCurrent = Math.sqrt((x - rectCurrent.left) ** 2 + (y - rectCurrent.top) ** 2);

    return distanceClosest < distanceCurrent ? closest : current;
  });

  return Array.from(closestLi.parentNode.children).indexOf(closestLi);
}
