'use client'

import { deleteUser, getAllUser, userUrl } from '@/app/api/user/route'
import { Text } from '@chakra-ui/react'
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import useSWR from 'swr'
import { useRecoilState } from 'recoil'
import { UserState } from '../atoms/UserState'
import { useRouter } from 'next/navigation'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

interface ResponseProps {
    id: number
    name: string
    age: number
}

export const UserTable = () => {
    const { data, error, mutate } = useSWR(userUrl, getAllUser)
    const [user, setUser] = useRecoilState(UserState)
    const router = useRouter()

    const PutOnSubmit = (data: ResponseProps) => {
        setUser((currentUser) => ({
            ...currentUser,
            ...{
                id: data.id,
                name: data.name,
                age: data.age,
            },
        }))
        router.push(`update/${data.id}`)
    }

    const DeleteOnSubmit = async (id: number) => {
        const res = await deleteUser(id, userUrl)
        console.log(res)
        mutate(data) // キャッシュにデータ変更を反映
    }

    return (
        <>
            {error && <Text>error</Text>}
            {!data ? (
                <Text>読み込み中</Text>
            ) : (
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Practice Next.js</TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Name</Th>
                                <Th isNumeric>Age</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((record: ResponseProps) => (
                                <Tr key={record.id}>
                                    <Td isNumeric>{record.id}</Td>
                                    <Td>{record.name}</Td>
                                    <Td isNumeric>{record.age}</Td>
                                    <Td>
                                        <EditIcon
                                            onClick={() => PutOnSubmit(record)}
                                            color='green.600'
                                            _hover={{ cursor: 'pointer', opacity: '0.5' }}
                                        />
                                    </Td>
                                    <Td>
                                        <DeleteIcon
                                            onClick={() => DeleteOnSubmit(record.id)}
                                            color='red.600'
                                            _hover={{ cursor: 'pointer', opacity: '0.5' }}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}
