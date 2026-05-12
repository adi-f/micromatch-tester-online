import { describe, it, expect } from "vitest";
import { checkMatch } from "../checker";
describe("checkMatch", () => {
  it("returns empty when input is empty", () => {
    expect(checkMatch("", "**/*.ts")).toEqual({ state: "empty" });
  });
  it("returns empty when pattern is empty", () => {
    expect(checkMatch("src/index.ts", "")).toEqual({ state: "empty" });
  });
  it("returns empty when both are empty", () => {
    expect(checkMatch("", "")).toEqual({ state: "empty" });
  });
  it("returns empty when input is whitespace only", () => {
    expect(checkMatch("   ", "**/*.ts")).toEqual({ state: "empty" });
  });
  it("returns match for a matching glob pattern", () => {
    expect(checkMatch("src/index.ts", "**/*.ts")).toEqual({ state: "match" });
  });
  it("returns match for exact file match", () => {
    expect(checkMatch("README.md", "README.md")).toEqual({ state: "match" });
  });
  it("returns match for nested path", () => {
    expect(checkMatch("src/components/Button.tsx", "src/**/*.tsx")).toEqual({ state: "match" });
  });
  it("returns no-match when pattern does not match", () => {
    expect(checkMatch("src/index.ts", "**/*.css")).toEqual({ state: "no-match" });
  });
  it("returns no-match for wrong directory", () => {
    expect(checkMatch("lib/index.ts", "src/**/*.ts")).toEqual({ state: "no-match" });
  });
  it("returns match for ? wildcard", () => {
    expect(checkMatch("a.ts", "?.ts")).toEqual({ state: "match" });
  });
  it("returns no-match for ? when string is longer", () => {
    expect(checkMatch("ab.ts", "?.ts")).toEqual({ state: "no-match" });
  });
  it("returns match for negation pattern", () => {
    expect(checkMatch("src/index.ts", "!**/*.css")).toEqual({ state: "match" });
  });
});
