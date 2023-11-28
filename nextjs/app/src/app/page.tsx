import { Flex, Heading } from '@chakra-ui/react'
import { UserTable } from './components/organisms/UserTable'
import { CreateForm } from './components/organisms/CreateForm'

export default function Home() {
    return (
        <div>
            <Flex direction='column' gap='20px'>
                <CreateForm />
                <Heading size='lg'>ユーザ一覧</Heading>
                <UserTable />
            </Flex>
        </div>
    )
}
