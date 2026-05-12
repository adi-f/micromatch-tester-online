import { isMatch as micromatchIsMatch } from "micromatch";
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
    const matched = micromatchIsMatch(input, pattern);
    return matched ? { state: "match" } : { state: "no-match" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { state: "error", message };
  }
}
