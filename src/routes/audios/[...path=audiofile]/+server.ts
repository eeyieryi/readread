import path from "path";
import { readFile } from "fs/promises";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
	try {
		const file = await readFile(
			path.join("_data", "audios", event.params.path),
		);
		return new Response(file.buffer, {
			status: 200,
			headers: {
				Connection: "close",
				"Accept-Ranges": "bytes",
				"Content-Length": file.byteLength.toString(),
				"Content-Type": "audio/mpeg",
			},
		});
	} catch {
		return new Response(null, {
			status: 404,
		});
	}
};
