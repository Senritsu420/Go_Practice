import { Input } from "@chakra-ui/react"
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    register?: UseFormRegisterReturn
    value?: string
    placeholder?: string
}

export const FormInput = (props: FormInputProps) => {
    const { register, value, placeholder } = props
    return (
        <Input {...register} type="text" value={value} placeholder={placeholder} />
    )
}