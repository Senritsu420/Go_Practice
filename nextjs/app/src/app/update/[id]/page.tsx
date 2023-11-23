'use client'

import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { UserState } from '@/app/components/atoms/UserState'
import { Flex, Heading } from '@chakra-ui/react'
import { UserUpdateForm } from '@/app/components/organisms/UserUpdateForm'

const Update: NextPage = () => {
    const user = useRecoilValue(UserState)
    console.log(user)

    return (
        <Flex direction='column' gap='20px'>
            <Heading size='lg'>ユーザ情報更新</Heading>
            <UserUpdateForm id={user.id} name={user.name} age={user.age} />
        </Flex>
    )
}

export default Update
