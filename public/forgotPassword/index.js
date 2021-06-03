document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault()
    const formDataEntries = Object.fromEntries(new FormData(this))
    console.log(formDataEntries);
    let response = await fetch('/forgotPassword', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataEntries)
    })
    response = await response.text()

    if (response == 'Email not found') document.getElementById("error").innerHTML = response
    else location.assign('../logIn/index.html')
})