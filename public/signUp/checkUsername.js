document.getElementsByName('username')[0].addEventListener('input', async function () {
    const username = this.value;
    let response = await fetch('/checkDistinct', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            check: 'username',
            data: username
        })
    })
    response = await response.text()
    document.getElementById("error").innerHTML = parseInt(response) ? 'That username is already being used, please try a different one.' : ''
})