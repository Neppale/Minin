const steps = [
  { name: "tests", script: "test" },
  { name: "Prettier", script: "prettier" },
  { name: "ESLint", script: "lint" },
  { name: "audit", script: "audit" },
] as const;

for (const step of steps) {
  console.log(`Running ${step.name}...`);
  const proc = Bun.spawn(["bun", "run", step.script], {
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    process.exit(exitCode);
  }
}

console.log("Pre-commit checks passed.");
export {};
