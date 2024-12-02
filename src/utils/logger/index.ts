
import pino, { Level, LogEvent } from 'pino'
import { format } from 'date-fns';
const PUBLIC_DOMAIN = process.env.NODE_ENV === 'production' ? 'https://next-15-pino-logger.vercel.app' : 'http://localhost:3000'

export const logger = pino({
  level: 'debug',  // 出力するログレベルを設定
  transport: process.env.VERCEL ? undefined : {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
          formatter: 'pretty',
          messageFormat: '',
        },
      },
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          colorize: false,
          destination: `logs/${format(new Date(), 'yyyy-MM-dd')}.log`,
          mkdir: true,
          translateTime: 'SYS:standard',
          formatter: 'pretty',
        },
      },
    ],
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  browser: {
    asObject: true,
    serialize: true,
    transmit: {
      send: (level: Level, logEvent: LogEvent) => {
        const messages = logEvent.messages
        void fetch(`${PUBLIC_DOMAIN}/api/log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ level, messages }),
          keepalive: true
        })
      }
    }
  },
})
