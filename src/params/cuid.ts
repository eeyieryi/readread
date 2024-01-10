import type { ParamMatcher } from "@sveltejs/kit";
import { z } from "zod";

export const match: ParamMatcher = (param) => {
	return z.string().cuid().safeParse(param).success;
};
