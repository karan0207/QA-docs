const { test, expect } = require('@playwright/test');

test.describe('Simple UI Test for Example.com', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto('https://example.com');
  });

  test('should have the correct heading', async ({ page }) => {
    // Locate the <h1> element
    const heading = page.locator('h1');
    
    // Verify the heading text
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('should display the "More information" link', async ({ page }) => {
    // Locate the link with text "More information"
    const moreInfoLink = page.locator('a:has-text("More information")');
    
    // Verify the link is visible and has the correct URL
    await expect(moreInfoLink).toBeVisible();
    await expect(moreInfoLink).toHaveAttribute('href', 'https://www.iana.org/domains/example');
  });
});
