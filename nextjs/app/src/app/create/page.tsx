'use client'

import { Button, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { userUrl, postUser } from "../api/user/route";

interface InputProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

const Create: NextPage = () => {
    const { register, handleSubmit } = useForm<InputProps>()

    const onSubmit: SubmitHandler<InputProps> = async(data: InputProps) => {
        const formattedData = {
            name: data.name,
            age: parseInt(data.age, 10)
        }
        const res = await postUser(userUrl, formattedData)
        console.log(res)
    }

    return (
        <Flex direction="column" gap="20px">
            <Heading size="lg">ユーザ新規作成</Heading>
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
        </Flex>
    )
}

export default Create