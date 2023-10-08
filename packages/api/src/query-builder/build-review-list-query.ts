import { Prisma } from '@prisma/client';

type ReviewQueryParams = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput | Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput[];
    otherArgs?: Prisma.ReviewFindManyArgs;
};

export function buildReviewListQuery(params?: ReviewQueryParams) {
    
    const where = params?.where ? params.where : {};
    const orderBy = params?.orderBy ? params.orderBy : [{ date: "desc" }, { updatedAt: "desc" }] as Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput[];

    const otherArgs = params?.otherArgs ? params.otherArgs : {};

    const reviewQuery = {
        select: {
            id: true,
            rating: true,
            date: true,
            s3ImageKey: true,
            restaurant: {
              select: {
                name: true,
                googleId: true,
              },
            },
            user: {
              select: {
                username: true,
              },
            },
            content: true,
          },
          where,
        orderBy,
        ...otherArgs
    } as const;

    return reviewQuery;
}
