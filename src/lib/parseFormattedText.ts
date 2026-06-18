/**
 * parseFormattedText
 *
 * Shared tokeniser that converts a plain-text string (potentially containing
 * backtick-wrapped inline code and double-backtick literal spans) into a
 * flat list of typed tokens that React components can render.
 *
 * ## Token types
 * - `text`           – Regular prose to render as plain text.
 * - `code`           – Content wrapped in single backticks → `<code>` element.
 * - `literal-backtick` – Content wrapped in double backticks (`` `` … `` ``) →
 *                        rendered as literal text (used to show a backtick char).
 * - `newline`        – Represents a `\n` character → `<br />`.
 *
 * ## Edge-case handling
 * Two patterns in ES6-themed content break naive `split("`")` parsers:
 *
 * 1. **Double-backtick spans** — `` `` ` `` `` — Markdown convention to
 *    display a literal backtick. Matched first by the regex.
 *
 * 2. **Indented code-block lines** — Lines starting with ≥ 2 spaces are
 *    treated as verbatim display code. Any backticks inside (e.g.
 *    `` const msg = `Hi, ${name}!`; ``) are NOT interpreted as markup.
 */

// Regex priority (alternation order matters):
//   1. Double-backtick span: ``…`` where … may contain single backticks.
//   2. Single-backtick span: `…` where … has no backtick or newline.
const TOKEN_RE = /``(?:[^`]|`(?!`))*``|`[^`\n]+`/g;

export type FormattedToken =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "literal-backtick"; value: string }
  | { type: "newline" };

/**
 * Tokenises a formatted theory / instruction string into typed tokens.
 *
 * @param text - Raw string from a JSON exercise field.
 * @returns Flat array of `FormattedToken` items ready for JSX rendering.
 */
export function parseFormattedText(text: string): FormattedToken[] {
  const tokens: FormattedToken[] = [];
  const lines = text.split("\n");

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    if (lineIdx > 0) tokens.push({ type: "newline" });

    const line = lines[lineIdx];

    // Empty lines and indented code-block lines → verbatim (no markup parsing).
    if (line === "" || line.startsWith("  ")) {
      tokens.push({ type: "text", value: line });
      continue;
    }

    // Prose line → scan for backtick spans.
    TOKEN_RE.lastIndex = 0;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = TOKEN_RE.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: "text", value: line.slice(lastIndex, match.index) });
      }

      const full = match[0];

      if (full.startsWith("``")) {
        // Double-backtick span → literal character(s).
        // Strip one surrounding space on each side per Markdown code-span spec.
        let inner = full.slice(2, -2);
        if (inner.startsWith(" ") && inner.endsWith(" ") && inner.trim().length > 0) {
          inner = inner.slice(1, -1);
        }
        tokens.push({ type: "literal-backtick", value: inner });
      } else {
        // Single-backtick span → inline code highlight.
        tokens.push({ type: "code", value: full.slice(1, -1) });
      }

      lastIndex = match.index + full.length;
    }

    // Remaining text after the last match on this line.
    if (lastIndex < line.length) {
      tokens.push({ type: "text", value: line.slice(lastIndex) });
    }
  }

  return tokens;
}
