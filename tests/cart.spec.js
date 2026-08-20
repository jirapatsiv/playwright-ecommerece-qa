const playwright = require('@playwright/test');

const test = playwright.test;
const expect = playwright.expect;

const { LoginPage } = require('../pages/LoginPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('TC-CART-001: Add item to cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});


test('TC-CART-002: Add multiple items to cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('TC-CART-007: Verify product price in cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
});

test('TC-CART-008: Remove product from cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await page.locator('#remove-sauce-labs-backpack').click();
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
});

test('TC-CART-009: Verify cart badge after removing an item', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await page.locator('#remove-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('TC-CART-011: Proceed from cart to checkout', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one/);
});