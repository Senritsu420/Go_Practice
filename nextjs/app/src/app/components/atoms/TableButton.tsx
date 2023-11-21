import { Button } from '@chakra-ui/react'

interface TableButtonProps {
    title: string
    color: string
    onClick: () => void
}

export const TableButton = (props: TableButtonProps) => {
    const { title, color, onClick } = props
    return (
        <Button colorScheme={color} variant='link' onClick={onClick}>
            {title}
        </Button>
    )
}
