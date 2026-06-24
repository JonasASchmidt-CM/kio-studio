import figma from '@figma/code-connect'

import { KioLogoMark } from './kio-logo-mark'

figma.connect(KioLogoMark, 'https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ?node-id=87-1116', {
  example: () => <KioLogoMark className="h-7 w-6" />,
})
