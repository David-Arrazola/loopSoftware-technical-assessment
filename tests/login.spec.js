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

    // Locate the task's conatiner that holds the given task title.
    // This scopes to a single task component instead of the whole page.
    const taskContainer = page
      .getByText(currCase.task)
      .locator("xpath=ancestor::div[1]");

    // Verify that all expected tags for the task exist within the scoped task card.
    // Each tag is validated against a <span> element inside the specific task container.
    for (const currTag of currCase.tags) {
      await expect(
        taskContainer.locator("span", { hasText: currTag }),
      ).toBeVisible();
    }
  });
}
