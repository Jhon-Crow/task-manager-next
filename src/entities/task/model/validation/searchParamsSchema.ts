import { z } from "zod";

export const searchParamsSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1)
        .optional(),

    sorting: z
        .preprocess(
            (val) => {
                if (Array.isArray(val)) return val[0];
                return val;
            },
            z.enum([
                'completed', '-completed',
                'title', '-title',
                'createdAt', '-createdAt'
            ]).optional()
        ).optional().catch(undefined),

    query: z.string().default("").optional()
});

export type searchParamsType = z.infer<typeof searchParamsSchema>;