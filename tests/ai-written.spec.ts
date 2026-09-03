import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://www.saucedemo.com";

const USERS = {
  standard: { username: "standard_user", password: "secret_sauce" },
  lockedOut: { username: "locked_out_user", password: "secret_sauce" },
};

async function login(page: Page, username: string, password: string) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

async function logout(page: Page) {
  await page.getByRole("button", { name: "Open Menu" }).click();
  const logoutLink = page.getByRole("link", { name: "Logout" });
  await expect(logoutLink).toBeVisible();
  await logoutLink.click();
}

test.describe("SauceDemo UI", () => {
  test("logs in successfully with valid credentials", async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator(".inventory_list")).toBeVisible();

    await logout(page);
  });

  test("shows an error when the password is incorrect", async ({ page }) => {
    await login(page, USERS.standard.username, "password123");

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });

  test("blocks login for a locked-out user", async ({ page }) => {
    await login(page, USERS.lockedOut.username, USERS.lockedOut.password);

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("adds a product to the cart after login", async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);

    await page.getByRole("button", { name: "Add to cart" }).first().click();

    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");

    await logout(page);
  });

  test("navigates to a product's detail page and back", async ({ page }) => {
    await login(page, USERS.standard.username, USERS.standard.password);

    const firstProductName = page.locator(".inventory_item_name").first();
    const productNameText = await firstProductName.textContent();
    await firstProductName.click();

    await expect(page).toHaveURL(/.*inventory-item\.html/);
    await expect(page.locator(".inventory_details_name")).toHaveText(
      productNameText ?? "",
    );

    await page.getByRole("button", { name: "Back to products" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);

    await logout(page);
  });
});
