replaceText(document.body);
// Add comment
function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    console.log('Content : ', element.textContent);
    if (element.textContent.match(/coronavirus/gi)) {
      const newElement = document.createElement('span');
    }
  }
}
