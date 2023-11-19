import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface UserFormProps {
    name: string;
    age: number;
}

export const UserForm = () => {
    return (
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="ユーザー太郎" />
        </FormControl>
    )
}