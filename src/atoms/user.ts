import { User } from '@/models/model'
import { atom } from 'recoil'

export const userAtom = atom<User | null>({
  key: 'atom/user',
  default: null,
})
