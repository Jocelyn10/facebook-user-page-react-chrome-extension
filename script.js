chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  getUsers(tabs[0].url);
  return tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
});

function getUsers(url) {
  let textLoadingDom = document.getElementById('loading-text');
  let loadingDom = document.getElementsByClassName('loading');

  textLoadingDom.style.display = 'block';
  loadingDom.style.display = 'block';

  // On production, we have to use your own backend url
  fetch(`http://localhost:3000/?url=${url}`)
    .then((r) => r.text())
    .then((result) => {
      // Result now contains the response text, do what you want...
      let targetDom = document.getElementById('response');
      textLoadingDom.style.display = 'none';
      loadingDom.style.display = 'none';
      targetDom.innerText = result;
    });
}
