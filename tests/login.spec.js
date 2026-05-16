import { test, expect } from "@playwright/test";

test("Successful login", async ({ page }) => {
  await page.goto("https://animated-gingersnap-8cf7f2.netlify.app/");
  await page.fill(`input[type="text"]`, "admin");
  await page.fill(`input[type="password"]`, "password123");
  await page.click('button[type="submit"]');
  await expect(page.locator("text=Web Application")).toBeVisible();
});
