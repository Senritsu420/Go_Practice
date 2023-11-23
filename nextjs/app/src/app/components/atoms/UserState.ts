import { atom } from 'recoil'

interface UserStateProps {
  id: number
  name: string
  age: number
}

export const UserState = atom<UserStateProps>({
  key: 'UserState',
  default: {
    id: 0,
    name: '',
    age: 0,
  },
})
