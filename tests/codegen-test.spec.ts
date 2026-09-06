import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page
    .locator('[data-test="inventory-item-description"]')
    .first()
    .click();
  await page.locator('[data-test="item-4-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="remove"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator("div").filter({ hasText: "Swag Labs" }).nth(5).click();
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("problem_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption("za");
  await page.locator('[data-test="item-2-img-link"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.getByText("A red light isn't the desired").click();
  await page.locator('[data-test="item-0-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
