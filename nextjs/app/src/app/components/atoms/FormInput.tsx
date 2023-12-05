import { Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    register: UseFormRegisterReturn
    placeholder: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = (props: FormInputProps) => {
    const { register, placeholder, value, onChange } = props
    return (
        <Input
            {...register}
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}
