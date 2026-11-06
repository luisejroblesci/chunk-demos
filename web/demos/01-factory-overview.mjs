// Starter demo: opens Factory and pauses. Replace the TODO steps with the real flow.
export async function run(page, { sleep, click, type }) {
  await page.goto('https://app.circleci.com/factory', { waitUntil: 'networkidle' });
  await sleep(2500);
  // TODO: e.g. await click(page.getByRole('button', { name: 'New plan' }));
  //       await type('Add retry logic');
  await sleep(2000);
}
