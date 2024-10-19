import { parentPort } from 'worker_threads'
import launchTranslation, { Request } from './translateFn'
import { ConversionStatus, ConversionStatusType } from '../global/types'

const port = parentPort
if (!port) throw new Error('IllegalState')

port.on('message', (request: Request) => {
  launchTranslation(request, port).then((output) => {
    port.postMessage({
      type: ConversionStatusType.STATUS,
      status: ConversionStatus.FINISHED,
      output
    })
    setTimeout(() => {
      port.close()
    }, 10000)
  })
})
