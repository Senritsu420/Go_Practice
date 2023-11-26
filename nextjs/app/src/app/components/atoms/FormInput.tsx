import { Input } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    register?: UseFormRegisterReturn
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const FormInput = (props: FormInputProps) => {
    const { register, value, placeholder, onChange } = props
    return (
        <Input
            {...register}
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}
