import { Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { UserForm } from "../components/organisms/UserForm";

const Create: NextPage = () => {
    return (
        <Flex direction="column" gap="20px">
            <Heading size="lg">ユーザ新規作成</Heading>
            <UserForm />
        </Flex>
    )
}

export default Create