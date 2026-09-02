import { test, expect } from "@playwright/test";

test.describe("sauce demo ui testuud: ", () => {
  //Amjilttai nevtreh test:
  test("Amjilttai nevtreh", async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Products")).toBeVisible();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.getByRole("button", { name: "Open Menu" }).click();
    const logoutLink = page.getByRole("link", { name: "Logout" });
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();
  });

  //Buruu nuuts ugeer nevtreh
  test("Buruu nuuts ugeer nevtreh", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();

    //Aldaanii message haragdaj baigaa esehiig shalgah
    const errorMSG = page.locator('[data-test="error"]');
    await expect(errorMSG).toBeVisible();
    await expect(errorMSG).toContainText(
      "Username and password do not match any user in this service",
    );
  });

  //Baraa sagsand hiih (nevtersenii daraah uildel)
  test("Nevtreed baraa sagsand nemeh", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    //Ehnii baraag sagsand hiih
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    //Sagsan deer 1 gesen too garch irseniig shalgah
    const Sags = page.locator(".shopping_cart_badge");
    await expect(Sags).toHaveText("1");
  });
});
