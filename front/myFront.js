fetch('/launcher/SC0.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('launcher').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('launcher').innerHTML = 'Не удалось загрузить файл')

fetch('/mainScript/SC_CHECKS.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('mainScript').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('mainScript').innerHTML = 'Не удалось загрузить файл')

fetch('/responses/responses.json')
    .then(data => data.json())
    .then(data => {
        const formattedJson = JSON.stringify(data, null, 4)
        document.getElementById('responses').innerHTML += `<pre>${formattedJson}</pre>`
    })
    .catch(() => document.getElementById('responses').innerHTML = 'Не удалось загрузить файл')