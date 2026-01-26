const baseUrl = process.env.BASE_URL

export const apiJson = async (url ,method, body) => {
    fetch(`${baseUrl}/${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}