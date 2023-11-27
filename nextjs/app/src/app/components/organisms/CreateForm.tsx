'use client'

import { getAllUser, postUser, userUrl } from '@/app/api/user/route'
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useSWR from 'swr'
import { FormInput } from '../atoms/FormInput'
import { FormNumberInput } from '../atoms/FormNumberInput'

interface UserProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

export const CreateForm = () => {
    const { register, handleSubmit } = useForm<UserProps>()
    const { data, mutate } = useSWR(userUrl, getAllUser)

    const onSubmit: SubmitHandler<UserProps> = async (query: UserProps) => {
        const formattedData = {
            name: query.name,
            age: parseInt(query.age, 10), // numberに変換
        }
        const res = await postUser(userUrl, formattedData)
        console.log(res)
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
                <Flex direction='column' gap='5px'>
                    <Flex direction='column'>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            placeholder='ユーザー太郎'
                            register={register('name', { required: '名前を入力してください' })}
                        />
                    </Flex>
                    <Flex direction='column'>
                        <FormLabel>Age</FormLabel>
                        <FormNumberInput
                            max={100}
                            min={0}
                            defaultValue={0}
                            register={register('age', {
                                required: '年齢を入力してください',
                                valueAsNumber: true,
                            })}
                        />
                    </Flex>
                    <Button type='submit' mt={4}>
                        新規作成
                    </Button>
                </Flex>
            </FormControl>
        </form>
    )
}
