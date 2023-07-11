import { atom, atomFamily } from 'recoil'


export const commonState = atom({
  key: `commonState`,
  default: {
    isLoading: true,
  }
})



