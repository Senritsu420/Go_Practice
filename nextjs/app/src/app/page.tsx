import { Flex, Heading } from '@chakra-ui/react'
import { UserTable } from './components/organisms/UserTable'
import { CreateForm } from './components/organisms/CreateForm'

export default function Home() {
    return (
        <>
            <Flex direction='column' gap='20px'>
                <Heading size='md' textAlign='center'>
                    フォーム
                </Heading>
                <CreateForm />
                <Heading size='md' textAlign='center'>
                    ユーザ一覧
                </Heading>
                <UserTable />
            </Flex>
        </>
    )
}
