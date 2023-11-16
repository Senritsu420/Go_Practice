import { Box, Flex } from "@chakra-ui/react"
import { Logo } from "../atoms/Logo"
import Link from "next/link"
import { HeaderLink } from "../atoms/HeaderLink"


export const Header = () => {
    return (
        <Flex borderBottom="1px" borderColor="gray.200" justifyContent="space-between" px="5%" py="2%">
            <Link href="/">
                <Logo />
            </Link>
            <Flex>
                <HeaderLink href="/create" title="新規作成" />
            </Flex>
        </Flex>
    )
}