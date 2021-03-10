export const get = async (
  url,
  extraHeaders,
  method = 'GET',
) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders
    },
  })
  const data = await res.json()
  
  return data
}



