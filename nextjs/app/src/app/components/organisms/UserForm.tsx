'use client'

import { postUser, userUrl } from "@/app/api/user/route";
import { Button, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface InputProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

export const UserForm = () => {
    const { register, handleSubmit } = useForm<InputProps>()

    const onSubmit: SubmitHandler<InputProps> = async(data: InputProps) => {
        const formattedData = {
            name: data.name,
            age: parseInt(data.age, 10) // numberに変換
        }
        const res = await postUser(userUrl, formattedData)
    }

    return (
        <Flex direction="column" gap="10px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="ユーザー太郎" {...register("name", { required: "名前を入力してください"})} />

                    <FormLabel>Age</FormLabel>
                    <NumberInput max={100} min={0} defaultValue={0}>
                        <NumberInputField {...register("age", { required: "年齢を入力してください", valueAsNumber: true})} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button type="submit" mt={4}>新規作成</Button>
            </form>
        </Flex>
    )
}