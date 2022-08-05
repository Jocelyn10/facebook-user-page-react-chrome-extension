fetch('https://companyleagues-api.herokuapp.com/api/challenge/custom').then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    const targetDom = document.getElementById('response');
    targetDom.innerText = result
}) 