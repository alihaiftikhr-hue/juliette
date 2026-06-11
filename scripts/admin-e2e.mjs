/* End-to-end smoke test for the admin panel, driven through system Chrome.
   Run: node scripts/admin-e2e.mjs  (dev server must be on :3000) */
import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const PASSWORD = "juliette2026";
let failures = 0;

function check(label, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures++;
}

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
});
const page = await browser.newPage();

try {
  // 1. /admin redirects to login when logged out
  await page.goto(`${BASE}/admin`);
  await page.waitForURL("**/admin/login");
  check("unauthenticated /admin redirects to login", page.url().includes("/admin/login"));

  // 2. wrong password rejected
  await page.fill("#admin-password", "wrong-password");
  await page.click("button[type=submit]");
  await page.waitForURL("**/admin/login?error=1");
  check("wrong password shows error", await page.locator("p[role=alert]").isVisible());

  // 3. correct password logs in
  await page.fill("#admin-password", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForURL(`${BASE}/admin`);
  check("login lands on product table", await page.locator("table").isVisible());

  // 4. stock +1 on first product
  const firstStock = page.locator("tbody tr").first().locator("td").nth(3);
  const before = parseInt((await firstStock.locator("span").first().innerText()).trim(), 10);
  await page.locator("tbody tr").first().getByLabel(/Increase stock/).click();
  await page.waitForLoadState("networkidle");
  const after = parseInt((await firstStock.locator("span").first().innerText()).trim(), 10);
  check(`stock increment (${before} -> ${after})`, after === before + 1);

  // 5. create a product (stock 0 to test sold-out display)
  await page.goto(`${BASE}/admin/products/new`);
  await page.fill("#p-name", "Test Tulle Bow");
  await page.selectOption("#p-category", "Bows");
  await page.fill("#p-price", "999");
  await page.fill("#p-stock", "0");
  await page.fill("#p-blurb", "A test product created by the e2e script.");
  await page.fill("#p-description", "Created automatically; should be deleted by this script.");
  await page.fill("#p-details", "Line one\nLine two");
  await page.getByRole("button", { name: "Create Product" }).click();
  await page.waitForURL("**/admin?saved=1");
  check("create product saves", await page.getByText("Test Tulle Bow").isVisible());

  // 6. new product appears in shop as sold out
  await page.goto(`${BASE}/shop/test-tulle-bow`);
  check("product page renders", await page.getByRole("heading", { name: "Test Tulle Bow" }).isVisible());
  check("sold-out state shown", await page.getByText("Sold Out").first().isVisible());

  // 7. edit: set stock to 3 → "Only 3 left"
  await page.goto(`${BASE}/admin`);
  const row = page.locator("tr", { hasText: "Test Tulle Bow" });
  await row.getByRole("link", { name: "Edit" }).click();
  await page.waitForSelector("#p-stock");
  await page.fill("#p-stock", "3");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForURL("**/admin?saved=1");
  await page.goto(`${BASE}/shop/test-tulle-bow`);
  check("edit updates stock (Only 3 left)", await page.getByText("Only 3 left").isVisible());

  // 8. delete the test product
  await page.goto(`${BASE}/admin`);
  await page.locator("tr", { hasText: "Test Tulle Bow" }).getByRole("button", { name: "Delete" }).click();
  await page.waitForURL("**/admin?deleted=1");
  check("delete removes product", !(await page.getByText("Test Tulle Bow").isVisible().catch(() => false)));
  const gone = await page.goto(`${BASE}/shop/test-tulle-bow`);
  check("deleted product 404s in shop", gone.status() === 404);

  // 9. logout protects admin again
  await page.goto(`${BASE}/admin`);
  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForURL("**/admin/login");
  await page.goto(`${BASE}/admin`);
  await page.waitForURL("**/admin/login");
  check("logout locks /admin", page.url().includes("/admin/login"));
} catch (err) {
  failures++;
  console.error("FAIL  script error:", err.message);
} finally {
  await browser.close();
}

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
