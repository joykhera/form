const form = document.getElementById('form')
form.innerHTML = form.innerHTML.replace('*USERNAME*', new URL(location.href).searchParams.get('username'))
console.log(form)
form.addEventListener('submit', async function (event) {
    event.preventDefault()
    console.log(this)
    const formDataEntries = Object.fromEntries(new FormData(this))
    console.log(formDataEntries)
    if (formDataEntries.password != formDataEntries.confirmPassword) document.getElementById("error").innerHTML = "Passwords do not match"
    else {
        let response = await fetch('/resetPassword', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formData: formDataEntries,
                key: new URL(location.href).searchParams.get('key')
            })
        })
        response = await response.text()

        if (response) document.getElementById('error').innerHTML = response
        else document.getElementById('message').innerHTML = 'Your password has been reset'
    }
})