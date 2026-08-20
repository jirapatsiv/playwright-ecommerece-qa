const playwright = require('@playwright/test');

const test = playwright.test;
const expect = playwright.expect;

const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../test-data/users');
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory/);
});

test('TC-CHECKOUT-002: Checkout with empty first name', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);

    await page.locator('#first-name').fill('');
    await page.locator('#last-name').fill('Siva');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    await expect(page.locator('.error-message-container')).toBeVisible();
});

test('TC-CHECKOUT-003: Checkout with empty last name', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    await page.locator('#first-name').fill('Pat');
    await page.locator('#last-name').fill('');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    await expect(page.locator('.error-message-container')).toBeVisible();
});

test('TC-CHECKOUT-004: Checkout with empty postal code', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    await page.locator('#first-name').fill('Pat');
    await page.locator('#last-name').fill('Siva');
    await page.locator('#postal-code').fill('');
    await page.locator('#continue').click();
    await expect(page.locator('.error-message-container')).toBeVisible();
});

test('TC-CHECKOUT-009: Complete order successfully', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    await page.locator('#first-name').fill('Pat');
    await page.locator('#last-name').fill('Siva');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    await page.locator('#finish').click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
