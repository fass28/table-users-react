import { useState } from 'react'
import { User} from '../types/types'

export const useUsers = () => {
  const [userIsDeleted, setUserIsDeleted] = useState(false)


  const URL = 'http://localhost:3000/users/'
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${URL}${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      setUserIsDeleted(true)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  const updateUser = async (id: number, user: User) => {
    try {
      const response = await fetch(`${URL}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  return {
    deleteUser,
    updateUser,
    userIsDeleted,
  }
}
