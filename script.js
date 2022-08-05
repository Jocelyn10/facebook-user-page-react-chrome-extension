fetch(`https://facebook-user-reacts-api.herokuapp.com/?url=${window.location.href}`).then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    const targetDom = document.getElementById('response');
    targetDom.innerText = result
}) 