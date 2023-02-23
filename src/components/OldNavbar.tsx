import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Flex, FlexProps, Link, Stack, Text, TextProps, useColorMode } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";

export type NavBarContainer = FlexProps

const DarkModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button onClick={toggleColorMode}>
            {/* Toggle {colorMode === 'light' ? 'dark' : 'Light'} */}
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            
        </Button>
    )
}
const NavBar = (props: NavBarContainer) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo
                w="100px"
            />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <NavLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const NavMenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }: { toggle: React.MouseEventHandler<HTMLDivElement>; isOpen: boolean }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <NavMenuIcon />}
        </Box>
    );
};

interface NavItemProps extends TextProps {
    isLast?: boolean;
    to: string;
}
const NavItem = ({ children, isLast = false, to = "/", ...rest }: NavItemProps) => {
    return (
        <Link href={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const NavLinks = ({ isOpen }: { isOpen: boolean; }) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <DarkModeToggle />
                <NavItem to="/">Home</NavItem>
                <NavItem to="/how">How It works </NavItem>
                <NavItem to="/faetures">Features </NavItem>
                <NavItem to="/pricing">Pricing </NavItem>
                <NavItem
                    to="/signup"
                    isLast
                    as={Button}
                    size="sm"
                    rounded="md"
                    bg="brand.500"
                    _hover={{
                        bg: 'brand.300'
                    }}
                >
                    Create Account
                </NavItem>
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }: FlexProps) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            px={8}
            py={2}
            borderBottom={'1px'}
            borderCIolor={'gray.400'}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            {...props}
        >
            {children}
        </Flex >
    );
};

export default NavBar;