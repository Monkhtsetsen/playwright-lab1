import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="password"]').press("Enter");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption("za");
  await page
    .locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
    .click();
  await page
    .locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]')
    .click();
  await page.locator('[data-test="item-3-img-link"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await page.locator('[data-test="about-sidebar-link"]').click();
  await page.locator("html").click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator("path").first().click();
  await page.locator('[data-test="username"]').fill("error_user");
  await page.goto("https://www.saucedemo.com/");
});
