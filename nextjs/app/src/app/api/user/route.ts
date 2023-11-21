export const userUrl = "http://localhost:8080/users"

interface UserProps {
  name: string;
  age: number
}

export async function getAllUser(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

export async function postUser(url: string, data: UserProps) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": data.name,
      "age": data.age,
    })
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

export const getOneUser = async (id: string, url: string) => {
  const res = await fetch(`${url}/${id}`)
  const resJson = await res.json()
  return resJson
}

export async function putUser(id: string, url: string, data: UserProps) {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": data.name,
      "age": data.age,
    })
  })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}