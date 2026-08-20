const playwright = require('@playwright/test');

const test = playwright.test;
const expect = playwright.expect;

const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../test-data/users');
const { invalidUser } = require('../test-data/users');
const { lockedUser } = require('../test-data/users');

test('TC-LOGIN-001: login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(validUser.username, validUser.password);

    await expect(page).toHaveURL(/inventory/);
});

test('TC-LOGIN-002: Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(invalidUser.username, invalidUser.password);

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-003: Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('', validUser.password);

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-005: Login with empty username', async ({page} ) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('', validUser.password);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-006: Login with empty password', async ({page} ) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(validUser.username, '');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-007: Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('', '');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-LOGIN-008: Login with locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(lockedUser.username, lockedUser.password);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});