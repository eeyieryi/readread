import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { t } from "$lib/server/trpc/t";
import validators from "$lib/validators";
import { prisma } from "$lib/server/prisma";

const baseSelect = {
	id: true,
	title: true,
	description: true,
	url: true,
	transcription: true,
	audiofilename: true,
	seen: true,
	collectionId: true,
	collection: false,
} satisfies Prisma.EntrySelect;

const selectWithCollection = {
	...baseSelect,
	collection: {
		select: {
			id: true,
			title: true,
		},
	},
} satisfies Prisma.EntrySelect;

const loadOne = t.procedure
	.input(validators.entry.loadOne)
	.query(async ({ input }) => {
		return await prisma.entry.findUniqueOrThrow({
			where: {
				id: input.entryId,
			},
			select: baseSelect,
		});
	});

const loadOneWithCollection = t.procedure
	.input(validators.entry.loadOne)
	.query(async ({ input }) => {
		return await prisma.entry.findUniqueOrThrow({
			where: {
				id: input.entryId,
			},
			select: selectWithCollection,
		});
	});

const createOne = t.procedure
	.input(validators.entry.createOne)
	.mutation(async ({ input }) => {
		if (!input.collectionId && !input.collectionTitle) {
			throw new TRPCError({ code: "BAD_REQUEST" });
		}
		return await prisma.entry.create({
			data: {
				title: input.title,
				transcription: input.transcription,
				audiofilename: input.audiofilename,
				description: input.description,
				url: input.url,
				collection: {
					connectOrCreate: {
						where: {
							id: input.collectionId ?? "",
						},
						create: {
							title: input.collectionTitle ?? "COLLECTION_TITLE",
						},
					},
				},
			},
			select: selectWithCollection,
		});
	});

const updateOne = t.procedure
	.input(validators.entry.updateOne)
	.mutation(async ({ input }) => {
		return await prisma.entry.update({
			where: {
				id: input.entryId,
			},
			data: {
				title: input.title,
				transcription: input.transcription,
				audiofilename: input.audiofilename ?? undefined,
				description: input.description ?? undefined,
				url: input.url ?? undefined,
				collectionId: input.collectionId,
				seen: input.seen,
			},
			select: selectWithCollection,
		});
	});

const deleteOne = t.procedure
	.input(validators.entry.deleteOne)
	.mutation(async ({ input }) => {
		return await prisma.entry.delete({
			where: {
				id: input.entryId,
			},
			select: {
				id: true,
				collectionId: true,
			},
		});
	});

export const entry = t.router({
	loadOne,
	loadOneWithCollection,
	createOne,
	updateOne,
	deleteOne,
});
