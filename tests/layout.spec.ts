import { test, expect } from "@playwright/test";
import { getPathname } from "./utils";

test.describe("root layout", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});
	test.describe("navbar", () => {
		test("has navbar", async ({ page }) => {
			await expect(page.getByRole("navigation")).toBeVisible();
			await expect(
				page.getByRole("link", { name: "Collections" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "Blank" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "New Collection" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "New Entry" }),
			).toBeVisible();
		});

		test("navigates", async ({ page }) => {
			// root page is /collections
			await page.waitForURL("**/collections");
			expect(getPathname(page.url())).toBe("/collections");
			await expect(
				page.getByRole("link", { name: "Collections" }),
			).toHaveClass(/active/);

			await page.getByRole("link", { name: "Blank" }).click();
			await page.waitForURL("**/blank");
			expect(getPathname(page.url())).toBe("/blank");
			await expect(page.getByRole("link", { name: "Blank" })).toHaveClass(
				/active/,
			);

			await page.getByRole("link", { name: "Collections" }).click();
			await page.waitForURL("**/collections");
			expect(getPathname(page.url())).toBe("/collections");
			await expect(
				page.getByRole("link", { name: "Collections" }),
			).toHaveClass(/active/);

			await page.getByRole("link", { name: "New Collection" }).click();
			await page.waitForURL("**/collections/new");
			expect(getPathname(page.url())).toBe("/collections/new");
			await expect(
				page.getByRole("link", { name: "New Collection" }),
			).toHaveClass(/active/);

			await page.getByRole("link", { name: "New Entry" }).click();
			await page.waitForURL("**/entries/new");
			expect(getPathname(page.url())).toBe("/entries/new");
			await expect(
				page.getByRole("link", { name: "New Entry" }),
			).toHaveClass(/active/);
		});
	});
});
