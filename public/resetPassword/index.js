const form = document.getElementById('form')
form.innerHTML = form.innerHTML.replace('*USERNAME*', new URL(location.href).searchParams.get('username'))

form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const formDataEntries = Object.fromEntries(new FormData(this))
    if (formDataEntries.password != formDataEntries.confirmPassword) document.getElementById("error").innerHTML = "Passwords do not match"
    else {
        let response = await fetch('/resetPassword', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                state: 'resetPassword',
                data: formDataEntries
            })
        })
        response = await response.text()

        if (response) document.getElementById('error').innerHTML = response
        else document.getElementById('message').innerHTML = 'Your password has been reset'
    }
})