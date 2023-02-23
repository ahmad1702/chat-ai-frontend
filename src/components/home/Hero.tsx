import {
    Button, Container, Flex, Heading,
    Image,
    Stack,
    Text
} from '@chakra-ui/react';
import { RouterLink } from '../../utils/utils';

export default function Hero() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={800}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Chatting... {' '}
                    <Text as={'span'} color={'brand.400'}>
                        but for an ml class
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Never miss a meeting. Never be late for one too. Keep track of your
                    meetings and receive smart reminders in appropriate times. Read your
                    smart “Daily Agenda” every morning.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        as={RouterLink}
                        to="/signup"
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'brand.400'}
                        _hover={{ bg: 'brand.500' }}>
                        Get started
                    </Button>
                    <Button rounded={'full'} px={6}>
                        Learn more
                    </Button>
                </Stack>
                <Flex w={'full'} justifyContent="center">
                    <Image
                        src="/chat-bot.svg"
                        height={{ sm: '24rem', lg: '28rem' }}
                        mt={{ base: 12, sm: 16 }}
                    />
                </Flex>
            </Stack>
        </Container>
    );
}