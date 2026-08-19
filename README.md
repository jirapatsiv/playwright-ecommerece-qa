# SauceDemo QA Testing Portfolio

## Overview

This project demonstrates hands-on experience in **manual testing and UI automation testing** using the SauceDemo e-commerce website.

The project covers:

* Login
* Shopping Cart
* Checkout
* End-to-End Order Flow

## Tools

* Playwright
* JavaScript
* Node.js
* Git & GitHub
* Visual Studio Code
* Excel

## Testing Coverage

### Login

* Valid and invalid login
* Required field validation
* Locked user
* Error messages

### Cart

* Add one or multiple products
* Verify cart badge
* Verify product details
* Remove product
* Proceed to checkout

### Checkout

* Required field validation
* Verify checkout details
* Verify total amount
* Complete order successfully

## QA Workflow

```text
Requirements
→ Test Scenarios
→ Test Cases
→ Manual Testing
→ Automation Selection
→ Playwright Automation
```

Selected high-priority and repeatable test cases were automated for regression testing.

## Project Structure

```text
qa-automation/
├── tests/
│   ├── login.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
├── docs/
│   └── test-cases.xlsx
├── playwright.config.js
├── package.json
└── README.md
```

## Run Tests

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run with browser:

```bash
npx playwright test --headed
```

View report:

```bash
npx playwright show-report
```

## Skills Demonstrated

* Manual Testing
* Functional Testing
* Test Case Design
* Positive & Negative Testing
* Regression Testing
* End-to-End Testing
* Playwright Automation
* Assertions & Locators
* Git Version Control

## Author

**Jirapat Sivamard**
