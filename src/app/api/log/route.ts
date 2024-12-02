import { logger } from "@/utils/logger";
import { NextRequest } from "next/server";
import { Level, LogEvent } from "pino";

export async function POST(req: NextRequest) {
  const data: {
    level: Level;
    messages: LogEvent['messages'];
  } = await req.json();

  logger[data.level](data.messages);

  return new Response('Message has been successfully logged on the server', {
      status: 200,
  })
}