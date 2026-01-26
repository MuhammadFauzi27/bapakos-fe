const baseUrl = import.meta.env.VITE_BASE_URL

export const apiJson = async (url, method, body) => {
  const res = await fetch(`${baseUrl}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  return await res.json()
}
