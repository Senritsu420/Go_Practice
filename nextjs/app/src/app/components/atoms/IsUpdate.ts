import { atom } from 'recoil'

export const IsUpdateState = atom<boolean>({
    key: 'IsUpdateState',
    default: false
})
