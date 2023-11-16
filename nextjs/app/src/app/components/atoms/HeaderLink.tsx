import { LinkBox } from "@chakra-ui/react"
import Link from "next/link"

type HeaderLinkProps = {
    href: string
    title: string
}

export const HeaderLink = (props: HeaderLinkProps) => {
    const { href, title } = props
    return (
        <LinkBox>
            <Link href={href}>{title}</Link>
        </LinkBox>
    )
}