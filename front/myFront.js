fetch('/configs/test.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('customs').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('customs').innerHTML = 'Не удалось загрузить файл')

fetch('/requests/test.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('requests').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('requests').innerHTML = 'Не удалось загрузить файл')

fetch('/responses/test.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('responses').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('responses').innerHTML = 'Не удалось загрузить файл')