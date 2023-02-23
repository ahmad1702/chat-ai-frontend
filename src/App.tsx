import { Box, Button, Icon, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import NavBar from './components/Navbar'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import useLocalStorageState from 'use-local-storage-state'

type Chat = {
  from: string;
  content: string;
}
const ChatMessage = ({ chat: { from, content }, prevChat, currentUserName }: { chat: Chat, currentUserName: string; prevChat: Chat | undefined }) => {
  const fromMe = from === currentUserName
  const newSenderInList = prevChat && prevChat.from === from
  return (
    <Box
      w="full"
      mt={newSenderInList ? 0.5 : 2}
      display="flex"
      justifyContent={fromMe ? "end" : 'start'}
    >
      <Box width="80%">
        {!newSenderInList && (
          <Text
            color="InfoText"
            fontWeight="semibold"
            pl={fromMe ? 0 : 2}
            pr={fromMe ? 2 : 0}
            textAlign={fromMe ? 'right' : 'left'}
          >
            {from}
          </Text>
        )}
        <Box
          bg={fromMe ? "brand.500" : useColorModeValue("gray.200", "gray.600")}
          p={4}
          color={fromMe ? 'white' : useColorModeValue('black', 'white')}
          overflowWrap="break-word"
          borderTopRadius="xl"
          borderBottomRightRadius={fromMe ? 0 : 'xl'}
          borderBottomLeftRadius={!fromMe ? 0 : 'xl'}
        >
          <Text whiteSpace="pre-line" overflowWrap="anywhere"> {content}</Text>
        </Box>
      </Box>
    </Box>
  )
}

type ChatInputProps = {
  onSubmit: (newMessage: string) => void
}
const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (value.length === 0) return;
    e?.preventDefault()
    onSubmit(value)
    setValue('')
  }

  // Reset field height
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
      return;
    }
    const el = e.currentTarget
    el.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(el);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('padding-top'), 10) + el.scrollHeight

    el.style.height = `${height}px`;
  }
  return (
    <Box position="relative" p={4}>
      <form onSubmit={handleSubmit}>
        <Textarea
          variant="filled"
          rows={1}
          value={value}
          onChange={handleChange}
          placeholder="What's on your mind?"
          resize="none"
          fontSize="xl"
          overflowY="hidden"
          w="full"
          pr={10}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme={'brand'} type="submit" position="absolute" bottom={6} right={7} zIndex={10} size="sm">
          <Icon as={PaperAirplaneIcon}></Icon>
        </Button>
      </form>
    </Box>
  )
}
function App() {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const currentUserName = 'me'
  const [chats, setChats] = useLocalStorageState<Chat[]>('chats', {
    defaultValue: [
      { from: 'me', content: "Hello Mr. Chatbot, I know you're not implemented fully yet, but hope you're doing well. " },
      { from: 'jim', content: "Thanks, can't wait to reply with machine learning algorithmic responses" },
    ]
  })

  const scrollToBottom = () => {
    const el = chatContainerRef.current
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const onChatInputSubmit = (newMessage: string) => {
    setChats([...chats, { from: currentUserName, content: newMessage }, { from: 'jim', content: newMessage }])
  }
  return (
    <Box bg="blackAlpha.50" height={'100vh'} display="flex" flexDirection="column" >
      <NavBar />
      <Box
        p={4}
        flex="1"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Box
          ref={chatContainerRef}
          flex="1"
          overflowY="auto"
          overflowX="hidden"
        >
          {chats.map((chat, i) => <ChatMessage key={i} chat={chat} currentUserName={currentUserName} prevChat={chats.at(i - 1)} />)}
        </Box>
        <ChatInput onSubmit={onChatInputSubmit} />
      </Box>
    </Box>
  )
}

export default App
