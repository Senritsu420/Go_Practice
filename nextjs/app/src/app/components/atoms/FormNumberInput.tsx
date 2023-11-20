import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormNumberInputProps {
    max: number
    min: number
    defaultValue?: number
    register?: UseFormRegisterReturn
}

export const FormNumberInput = (props: FormNumberInputProps) => {
    const { max, min, defaultValue, register } = props
    return (
        <NumberInput max={max} min={min} defaultValue={defaultValue}>
            <NumberInputField {...register} />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}
