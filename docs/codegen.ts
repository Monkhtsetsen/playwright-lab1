import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="password"]').press("Enter");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="login-button"]').click();
  await page.locator("path").first().click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("performance_glitch_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.goto("https://www.saucedemo.com/inventory-item.html?id=3");
  await page.locator("div").filter({ hasText: "Swag Labs" }).nth(5).click();
});
