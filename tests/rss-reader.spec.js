import { test, expect } from '@playwright/test';

test('renders the RSS form and validates malformed URLs without network access', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'RSS Reader' })).toBeVisible();
  const input = page.getByRole('textbox', { name: 'url' });
  await expect(input).toBeVisible();
  await expect(page.getByRole('button', { name: 'add' })).toBeVisible();

  await input.fill('not-a-valid-url');
  await page.getByRole('button', { name: 'add' }).click();

  await expect(page.locator('.feedback')).toHaveText('Must be valid URL');
});
