import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const messagesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.messages.findMany()),
  addMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.number(),
        channel: z.string(),
        recipient: z.string(),
        recipient_number: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.messages.create({
        data: {
          channel: input.channel,
          msg_text: input.message,
          recipient_name: input.recipient,
          recipient_number: input.recipient_number,
          send_timestamp: parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0), 10), // unix timestamp
          user_id: input.userId,
        },
      }),
    ),
});
