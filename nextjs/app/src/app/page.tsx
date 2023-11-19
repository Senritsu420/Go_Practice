'use client'

import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Flex, Heading, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { userUrl, getAllUser } from './api/user/route'

interface ResponseProps {
  id: number,
  name: string,
  age: number
}

export default function Home() {
  const {data, error} = useSWR(userUrl, getAllUser)
  console.log("fetch!!")

  return (
    <div>
      <Flex direction="column" gap="20px">
        <Heading size="lg">ユーザ一覧</Heading>
        {error && <Text>error</Text>}
        {!data ? <Text>読み込み中</Text> : (
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th isNumeric>Id</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Age</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((record: ResponseProps) => (
                <Tr key={record.id}>
                  <Td isNumeric>{record.id}</Td>
                  <Td>{record.name}</Td>
                  <Td isNumeric>{record.age}</Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </div>
  )
}
