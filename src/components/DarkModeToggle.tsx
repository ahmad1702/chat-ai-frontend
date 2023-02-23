import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, useColorMode } from "@chakra-ui/react"

const DarkModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button onClick={toggleColorMode}>
            {/* Toggle {colorMode === 'light' ? 'dark' : 'Light'} */}
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}

        </Button>
    )
}

export default DarkModeToggle;