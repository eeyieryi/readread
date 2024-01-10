import { z } from "zod";

export const entryIdSchema = z.object({
	entryId: z.string().cuid(),
});

export const collectionIdSchema = z.object({
	collectionId: z.string().cuid(),
});

export type WithCollectionId = z.infer<typeof collectionIdSchema>;
