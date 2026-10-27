/**
 * Loads ./.env (git-ignored) into process.env for local development, if the file exists.
 * Hosted environments (Vercel, Render…) set variables in their dashboard and have no .env file.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
if (existsSync(file) && typeof process.loadEnvFile === 'function') process.loadEnvFile(file);
