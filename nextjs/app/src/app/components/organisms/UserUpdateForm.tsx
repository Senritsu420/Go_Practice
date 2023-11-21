'use client'

import { getOneUser, putUser, userUrl } from "@/app/api/user/route";
import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../atoms/FormInput";
import { FormNumberInput } from "../atoms/FormNumberInput";
import { useEffect, useRef } from "react";

interface UserProps {
    name: string
    age: string // ChakraUIのNumberInputは値がstringになるため
}

export const UserUpdateForm = (id: string) => {
    const { register, handleSubmit } = useForm<UserProps>()
    const data = useRef({
        name: "",
        age: 0
    });
    useEffect(() => {
        (async() => {
            const res = await getOneUser(id, userUrl)
            data.current = res
        })
    }, [])

    const onSubmit: SubmitHandler<UserProps> = async(data: UserProps) => {
        const formattedData = {
            name: data.name,
            age: parseInt(data.age, 10) // numberに変換
        }
        const res = await putUser(id, userUrl, formattedData)
        console.log(res)
    }

    return (
        <Flex direction="column" gap="10px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <FormInput value={data.current.name} placeholder="ユーザー太郎" register={register("name", { required: "名前を入力してください"})}  />

                    <FormLabel>Age</FormLabel>
                    <FormNumberInput max={100} min={0} defaultValue={data.current.age} register={register("age", { required: "年齢を入力してください", valueAsNumber: true})} />
                </FormControl>
                <Button type="submit" mt={4}>更新</Button>
            </form>
        </Flex>
    )
}