import figma from '@figma/code-connect'

import { ChatSidebar } from './chat-sidebar'

figma.connect(ChatSidebar, 'https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ?node-id=87-1121', {
  example: () => (
    <ChatSidebar
      messages={[]}
      onSend={() => {}}
      onClearChat={() => {}}
      onHistory={() => {}}
      onOpenArtifact={() => {}}
    />
  ),
})
