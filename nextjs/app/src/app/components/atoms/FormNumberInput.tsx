import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormNumberInputProps {
    max: number
    min: number
    register: UseFormRegisterReturn
    value: number
    onChange: (valueAsString: string, valueAsNumber: number) => void
}

export const FormNumberInput = (props: FormNumberInputProps) => {
    const { max, min, register, value, onChange } = props
    return (
        <NumberInput max={max} min={min} value={value} onChange={onChange}>
            <NumberInputField {...register} />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}
