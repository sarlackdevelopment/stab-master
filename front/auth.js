document.getElementById('_jwt').addEventListener('click', () => {
    fetch('/getToken')
        .then(data => data.json())
        .then(({token}) => {       
            const user = {
                login: document.getElementById('login').value,
                password: document.getElementById('password').value
            }
            fetch('/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: `bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            .then(({url}) => document.location.href = url)
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})