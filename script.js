chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  getUsers(tabs[0].url);
  return tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
});

/*
function getUsers(url){
    fetch(`http://ec2-3-85-47-70.compute-1.amazonaws.com:3000/?url=${url}`).then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...
        const targetDom = document.getElementById('response');
        targetDom.innerText = result
    }) 
} */

function getUsers(url) {
  let textLoadingDom = document.getElementById('loading-text');
  let loadingDom = document.getElementsByClassName('loading');

  textLoadingDom.style.display = 'block';
  loadingDom.style.display = 'block';

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

/*
fetch(`https://facebook-user-reacts-api.herokuapp.com/?url=${window.location.href}`).then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    const targetDom = document.getElementById('response');
    targetDom.innerText = result
}) */
