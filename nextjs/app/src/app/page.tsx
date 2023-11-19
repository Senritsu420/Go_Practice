import { Flex, Heading } from '@chakra-ui/react'
import { UserTable } from './components/organisms/UserTable'

export default function Home() {
  return (
    <div>
      <Flex direction="column" gap="20px">
        <Heading size="lg">ユーザ一覧</Heading>
        <UserTable />
      </Flex>
    </div>
  )
}
