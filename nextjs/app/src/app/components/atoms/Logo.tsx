import { Flex, Icon, Text } from "@chakra-ui/react"
import FaceIcon from '@mui/icons-material/Face';

export const Logo = () => {
    return (
        <Flex>
            <Icon as={FaceIcon}/>
            <Text>Users</Text>
        </Flex>
    )
}