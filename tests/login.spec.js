const playwright = require('@playwright/test');

const test = playwright.test;
const expect = playwright.expect;


test('TC-LOGIN-001: login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
});

test('TC-LOGIN-002: Login with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('invalid_password');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-003: Login with empty username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-005: Login with empty username', async ({page} ) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-006: Login with empty password', async ({page} ) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-007: Login with empty credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('');
    await page.locator('#password').fill('');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-008: Login with locked user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();        
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});