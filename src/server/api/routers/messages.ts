import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const messagesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.messages.findMany()),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.messages.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  addOne: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.number(),
        channel: z.string(),
        recipient_name: z.string(),
        recipient_number: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.messages.create({
        data: {
          channel: input.channel,
          msg_text: input.message,
          recipient_name: input.recipient_name,
          recipient_number: input.recipient_number,
          send_timestamp: parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0), 10), // unix timestamp
          user_id: input.userId,
        },
      }),
    ),
  updateOne: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.number(),
        channel: z.string(),
        recipient_name: z.string(),
        recipient_number: z.string(),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.messages.update({
        where: {
          id: input.id,
        },
        data: {
          msg_text: input.message,
          user_id: input.userId,
          channel: input.channel,
          recipient_name: input.recipient_name,
          recipient_number: input.recipient_number,
        },
      }),
    ),
  deleteOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.messages.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
