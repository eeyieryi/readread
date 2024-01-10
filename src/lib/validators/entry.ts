import { z } from "zod";
import { collectionIdSchema, entryIdSchema } from "./shared";

export const loadOne = entryIdSchema;

const createOneSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional().nullable(),
	url: z.string().optional().nullable(),
	transcription: z.string().min(1),
	audiofilename: z.string().optional().nullable(),
});

export const createOne = createOneSchema
	.merge(
		z.object({
			collectionId: z.string().optional(),
			collectionTitle: z.string().optional(),
		}),
	)
	.refine(
		({ collectionId, collectionTitle }) => {
			return (
				z.string().cuid().safeParse(collectionId) ||
				(collectionTitle && collectionTitle.length > 0)
			);
		},
		{
			message:
				"At least one of the fields (collectionId or collectionTitle) must be provided",
		},
	);

const readStatusSchema = z.object({
	seen: z.boolean().optional(),
});

const readStatusSchemaString = z.object({
	seen: z
		.enum(["true", "false"])
		.optional()
		.transform((arg) =>
			arg === "true" ? true : arg === "false" ? false : undefined,
		),
});

export const updateOne = createOneSchema
	.merge(collectionIdSchema)
	.merge(readStatusSchema)
	.partial()
	.merge(entryIdSchema);

export const updateOneForm = updateOne.merge(readStatusSchemaString);

export const deleteOne = entryIdSchema;
