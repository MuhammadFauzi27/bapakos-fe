export const baseUrl = import.meta.env.VITE_BASE_URL
export const baseUrlImg = import.meta.env.VITE_IMAGE_URL

export const apiJson = async (url, method, body, headers= {}) => {
  const res = await fetch(`${baseUrl}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  return await res.json()
}
