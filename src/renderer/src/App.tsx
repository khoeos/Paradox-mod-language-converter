import { ScrollArea } from '@renderer/components/ui/ScrollArea'
import Header from '@renderer/components/Header'
import LanguageConverter from '@renderer/components/LanguageConverter'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <ScrollArea className={'h-full w-full mt-16 pb-16'}>
        <LanguageConverter />
      </ScrollArea>
    </>
  )
}

export default App
