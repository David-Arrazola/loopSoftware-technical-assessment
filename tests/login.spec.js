import { test, expect } from "@playwright/test";
import testCases from "./testCases";

for (const currCase of testCases) {
  test(`Verify: ${currCase.task}`, async ({ page }) => {
    //logic for logging in per every test case
    await page.goto("https://animated-gingersnap-8cf7f2.netlify.app/");
    await page.fill(`input[type="text"]`, "admin");
    await page.fill(`input[type="password"]`, "password123");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("h1", { hasText: "Web Application" }),
    ).toBeVisible();

    //logic for clicking on correct tab to check ("Web application")
    await page.click(`text=${currCase.app}`);

    //logic for verifying that specified column exists
    await expect(page.getByText(currCase.column)).toBeVisible();
    // console.log("COLUMN EXISTS");

    //logic for verifying that task is in specified column
    await expect(page.getByText(currCase.task)).toBeVisible();

    //logic for verifying if specified tags exists in the task
    for (const currTag of currCase.tags) {
      await expect(page.getByText(currTag)).toBeVisible();
    }
  });
}
