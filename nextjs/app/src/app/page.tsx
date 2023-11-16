import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Flex, Heading } from '@chakra-ui/react'

type Response = {
  ID: number,
  Name: string,
  Age: number
}

async function fetcher() {
  const response = await fetch("http://backend:8080/users")

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export default async function Home() {
  const res = await fetcher();

  return (
    <div>
      <Flex direction="column" gap="20px">
        <Heading size="lg">ユーザ一覧</Heading>
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
              {res.map((data: Response) => (
              <Tr key={data.ID}>
                <Td isNumeric>{data.ID}</Td>
                <Td>{data.Name}</Td>
                <Td isNumeric>{data.Age}</Td>
              </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </div>
  )
}
