import {atom} from 'recoil'

export const currentUserTokenAtom = atom ({
    key: "currentUserToken",
    default: ['']
})