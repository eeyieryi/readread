import { z } from "zod";
import { collectionIdSchema } from "./shared";

export const loadOne = collectionIdSchema;

export const createOne = z.object({
	title: z.string().min(1),
	description: z.string().optional().nullable(),
	url: z.string().optional().nullable(),
});

export const updateOne = createOne.partial().merge(collectionIdSchema);

export const deleteOne = collectionIdSchema;
