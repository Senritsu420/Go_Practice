import { Input } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    register?: UseFormRegisterReturn
    placeholder?: string
    defaultValue?: string
}

export const FormInput = (props: FormInputProps) => {
    const { register, placeholder, defaultValue } = props
    return <Input {...register} type='text' placeholder={placeholder} defaultValue={defaultValue} />
}
