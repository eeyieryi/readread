import type { Prisma } from "@prisma/client";
import { t } from "$lib/server/trpc/t";
import validators from "$lib/validators";
import { prisma } from "$lib/server/prisma";

const baseSelect = {
	id: true,
	title: true,
	description: true,
	url: true,
	entries: false,
} satisfies Prisma.CollectionSelect;

const selectWithEntries = {
	...baseSelect,
	entries: {
		select: {
			id: true,
			title: true,
			seen: true,
		},
	},
} satisfies Prisma.CollectionSelect;

const loadAll = t.procedure.query(async () => {
	return await prisma.collection.findMany({
		where: {},
		select: baseSelect,
	});
});

const loadAllWithEntries = t.procedure.query(async () => {
	return await prisma.collection.findMany({
		where: {},
		select: selectWithEntries,
	});
});

const loadOne = t.procedure
	.input(validators.collection.loadOne)
	.query(async ({ input }) => {
		return await prisma.collection.findUniqueOrThrow({
			where: {
				id: input.collectionId,
			},
			select: baseSelect,
		});
	});

const loadOneWithEntries = t.procedure
	.input(validators.collection.loadOne)
	.query(async ({ input }) => {
		return await prisma.collection.findUniqueOrThrow({
			where: {
				id: input.collectionId,
			},
			select: selectWithEntries,
		});
	});

const createOne = t.procedure
	.input(validators.collection.createOne)
	.mutation(async ({ input }) => {
		return await prisma.collection.create({
			data: {
				title: input.title,
				description: input.description,
				url: input.url,
			},
			select: baseSelect,
		});
	});

const updateOne = t.procedure
	.input(validators.collection.updateOne)
	.mutation(async ({ input }) => {
		return await prisma.collection.update({
			where: {
				id: input.collectionId,
			},
			data: {
				title: input.title,
				description: input.description ?? undefined,
				url: input.url ?? undefined,
			},
			select: baseSelect,
		});
	});

const deleteOne = t.procedure
	.input(validators.collection.deleteOne)
	.mutation(async ({ input }) => {
		return await prisma.collection.delete({
			where: {
				id: input.collectionId,
			},
			select: {
				id: true,
			},
		});
	});

export const collection = t.router({
	loadAll,
	loadAllWithEntries,
	loadOne,
	loadOneWithEntries,
	createOne,
	updateOne,
	deleteOne,
});
