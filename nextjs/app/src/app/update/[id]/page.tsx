'use client'

import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { UserState } from '@/app/components/atoms/UserState'

interface UserProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

const Update: NextPage = () => {
    const user = useRecoilValue(UserState)
    console.log(user)

    return (
        <>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </>
    )
}

export default Update
