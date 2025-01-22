import { User, UserResponse, UserUpdate } from '@/types/types'
import { BASEURL } from '@/utils/enum/url'

export const getUser = async (): Promise<User[]> => {
  const response = await fetch(`${BASEURL}/users`)
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios')
  }
  const data: { users: User[] } = await response.json()
  return data.users
}

export const deleteUser = async (id: number): Promise<UserUpdate> => {
  const response = await fetch(`${BASEURL}/users/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Error al eliminar el usuario')
  }
  const { user }: UserResponse = await response.json()
  return user
}

export const updateUser = async (
  id: number,
  payload: UserUpdate
): Promise<User> => {
  const response = await fetch(`${BASEURL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Error al Actualizar el usuario')
  }
  const { user }: UserResponse = await response.json()
  return user
}
