'use client'

import { getAllUser, userUrl } from '@/app/api/user/route'
import { Text } from '@chakra-ui/react'
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import useSWR from 'swr'

interface ResponseProps {
    id: number,
    name: string,
    age: number
}

export const UserTable = () => {
    const {data, error} = useSWR(userUrl, getAllUser)
    console.log("fetch!!")
    return (
        <>
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
        </>
    )
}