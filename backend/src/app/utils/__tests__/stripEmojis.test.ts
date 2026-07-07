import { stripEmojis } from "../stripEmojis";

describe("stripEmojis utility", () => {
  it("should return empty string for null, undefined or non-string inputs", () => {
    expect(stripEmojis(null as any)).toBe("");
    expect(stripEmojis(undefined as any)).toBe("");
    expect(stripEmojis(123 as any)).toBe("");
  });

  it("should return the original string if it contains no emojis", () => {
    expect(stripEmojis("hello world")).toBe("hello world");
    expect(stripEmojis("12345!@#$%")).toBe("12345!@#$%");
  });

  it("should strip simple smiley face emojis", () => {
    expect(stripEmojis("hello 😊 world")).toBe("hello  world");
    expect(stripEmojis("🚀 space adventure")).toBe("space adventure");
  });

  it("should strip complex zero-width joiner sequences", () => {
    // Family emoji: 👨‍👩‍👧‍👦
    expect(stripEmojis("family 👨‍👩‍👧‍👦 time")).toBe("family  time");
  });

  it("should strip country flag emojis", () => {
    // Flag: 🇮🇳
    expect(stripEmojis("India flag 🇮🇳")).toBe("India flag");
  });

  it("should return empty string if the input only contains emojis", () => {
    expect(stripEmojis("😊🚀🇮🇳")).toBe("");
  });
});
