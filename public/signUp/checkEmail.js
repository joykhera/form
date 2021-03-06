document.getElementsByName('email')[0].addEventListener('input', async function () {
    const email = this.value;
    let response = await fetch('/checkDistinct', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            check: 'email',
            data: email
        })
    })
    response = await response.text()
    document.getElementById("error").innerHTML = parseInt(response) ? 'That email is already being used, please try a different one.' : ''
})