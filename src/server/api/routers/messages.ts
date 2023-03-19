import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';

export const messagesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.messages.findMany();
  }),
});
