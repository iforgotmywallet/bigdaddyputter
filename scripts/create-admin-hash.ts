import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

function setEnvValue(source: string, key: string, value: string) {
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(source)) return source.replace(pattern, () => line);
  return `${source.trimEnd()}\n${line}\n`;
}

function hasEnvValue(source: string, key: string) {
  const match = source.match(new RegExp(`^${key}=(.*)$`, "m"));
  return Boolean(match?.[1].trim().replace(/^(["'])(.*)\1$/, "$2"));
}

async function main() {
  const readline = createInterface({ input: stdin, output: stdout });
  const password = await readline.question("Admin password (minimum 12 characters): ");
  const confirmation = await readline.question("Enter the same password again: ");
  readline.close();
  if (password.length < 12) throw new Error("Use at least 12 characters.");
  if (password !== confirmation) throw new Error("Passwords do not match. Run the command again.");

  const envPath = join(process.cwd(), ".env.local");
  let env: string;
  try {
    env = await readFile(envPath, "utf8");
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
    env = await readFile(join(process.cwd(), ".env.example"), "utf8");
  }

  // Next.js expands dollar signs in env files, so bcrypt delimiters must be escaped.
  const passwordHash = (await hash(password, 12)).replaceAll("$", "\\$");
  env = setEnvValue(env, "ADMIN_PASSWORD_HASH", passwordHash);
  if (!hasEnvValue(env, "ADMIN_SESSION_SECRET")) {
    env = setEnvValue(env, "ADMIN_SESSION_SECRET", randomBytes(32).toString("base64"));
  }
  await writeFile(envPath, env.endsWith("\n") ? env : `${env}\n`, { mode: 0o600 });

  console.log("Admin login configured in .env.local.");
  console.log("Restart the development server, then sign in with the password you just entered.");
}
main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
