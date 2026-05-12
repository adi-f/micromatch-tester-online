import micromatch from "micromatch";
export type CheckResult =
  | { state: "empty" }
  | { state: "match" }
  | { state: "no-match" }
  | { state: "error"; message: string };
export function checkMatch(input: string, pattern: string): CheckResult {
  if (input.trim() === "" || pattern.trim() === "") {
    return { state: "empty" };
  }
  try {
    const matched = micromatch.isMatch(input, pattern);
    return matched ? { state: "match" } : { state: "no-match" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { state: "error", message };
  }
}
