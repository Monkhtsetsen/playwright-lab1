import { test, expect } from "@playwright/test";

test.describe("sauce demo ui testuud: ", () => {
  //Amjilttai nevtreh test:
  test("Amjilttai nevtreh", async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("WrongProduct")).toBeVisible();
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

    await page.getByRole("button", { name: "Open Menu" }).click();
    const logoutLink = page.getByRole("link", { name: "Logout" });
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();
  });

  //locked_out_user eer nevtreh
  test("Locked out bolson usereer nevtreh", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("locked_out_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    //locked out bolson tuhai aldaanii message garch irehiig shalgah
    const errorMSG = page.locator('[data-test="error"]');
    await expect(errorMSG).toBeVisible();
    await expect(errorMSG).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
  //Baraanii delgerengui page ruu orj harah
  test("Baraanii ner deer darch delgerengui huudas ruu shiljih", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    //Ehnii baraanii ner deer darah
    const firstProductName = page.locator(".inventory_item_name").first();
    const productNameText = await firstProductName.textContent();
    await firstProductName.click();

    //Delgerengui huudasnii url bolon neriig batalgaajuulah
    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator(".inventory_details_name")).toHaveText(
      productNameText || "",
    );

    //Back to product tovchoor butsah
    await page.getByRole("button", { name: "Back to products" }).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.getByRole("button", { name: "Open Menu" }).click();
    const logoutLink = page.getByRole("link", { name: "Logout" });
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();
  });
});
