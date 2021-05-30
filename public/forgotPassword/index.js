document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()
    const formDataEntries = Object.fromEntries(new FormData(this))
    console.log(formDataEntries);
    (async () => {
        let response = await fetch(location.origin, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                state: 'forgotPassword',
                data: formDataEntries
            })
        })
        console.log(response)
        response = await response.text()

        if (response == 'Email not found') document.getElementById("error").innerHTML = response
        else location.assign('../logIn/index.html')
    })()
})