// One-time login. Opens a browser; sign in to CircleCI (SSO/2FA ok), then press Enter in the terminal.
// Saves the session to web/.auth/state.json (gitignored).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import readline from 'node:readline/promises';

mkdirSync(new URL('./.auth/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext();
const page = await ctx.newPage();
await page.goto('https://app.circleci.com/factory');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
await rl.question('Sign in, then press Enter here to save the session... ');
rl.close();
await ctx.storageState({ path: new URL('./.auth/state.json', import.meta.url).pathname });
await browser.close();
console.log('Saved web/.auth/state.json');
