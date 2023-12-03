'use client'

import { deleteUser, getAllUser, userUrl } from '@/app/api/user/route'
import { Text } from '@chakra-ui/react'
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import useSWR from 'swr'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { UserState } from '../atoms/UserState'
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons'
import { IsUpdateState } from '../atoms/IsUpdate'

interface ResponseProps {
    id: number
    name: string
    age: number
}

export const UserTable = () => {
    const { data, error, mutate } = useSWR(userUrl, getAllUser)
    const setUser = useSetRecoilState(UserState)
    const [isUpdate, setIsUpdate] = useRecoilState(IsUpdateState)

    // 編集ボタン押下時の挙動
    const PutButtonHandle = (data: ResponseProps) => {
        setUser(() => ({
            ...{
                id: data.id,
                name: data.name,
                age: data.age,
            },
        }))
        setIsUpdate(true)
        console.log(isUpdate)
    }

    // キャンセルボタン押下時の挙動
    const CancelButtonHandle = () => {
        setUser(() => ({
            ...{
                id: 0,
                name: '',
                age: 0,
            },
        }))
        setIsUpdate(false)
        console.log(isUpdate)
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
                                        {isUpdate ? (
                                            <CloseIcon
                                                onClick={() => CancelButtonHandle()}
                                                color='green.600'
                                                _hover={{ cursor: 'pointer', opacity: '0.5' }}
                                            />
                                        ) : (
                                            <EditIcon
                                                onClick={() => PutButtonHandle(record)}
                                                color='green.600'
                                                _hover={{ cursor: 'pointer', opacity: '0.5' }}
                                            />
                                        )}
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
