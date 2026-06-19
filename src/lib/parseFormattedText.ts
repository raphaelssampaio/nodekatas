const TOKEN_RE = /``(?:[^`]|`(?!`))*``|`[^`\n]+`|\*\*[^*\n]+\*\*/g;

export type FormattedToken =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "literal-backtick"; value: string }
  | { type: "bold"; value: string }
  | { type: "newline" };

export function parseFormattedText(text: string): FormattedToken[] {
  const tokens: FormattedToken[] = [];
  const lines = text.split("\n");

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    if (lineIdx > 0) tokens.push({ type: "newline" });

    const line = lines[lineIdx];

    if (line === "" || line.startsWith("  ")) {
      tokens.push({ type: "text", value: line });
      continue;
    }

    TOKEN_RE.lastIndex = 0;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = TOKEN_RE.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: "text", value: line.slice(lastIndex, match.index) });
      }

      const full = match[0];

      if (full.startsWith("``")) {
        let inner = full.slice(2, -2);
        if (inner.startsWith(" ") && inner.endsWith(" ") && inner.trim().length > 0) {
          inner = inner.slice(1, -1);
        }
        tokens.push({ type: "literal-backtick", value: inner });
      } else if (full.startsWith("**")) {
        tokens.push({ type: "bold", value: full.slice(2, -2) });
      } else {
        tokens.push({ type: "code", value: full.slice(1, -1) });
      }

      lastIndex = match.index + full.length;
    }

    if (lastIndex < line.length) {
      tokens.push({ type: "text", value: line.slice(lastIndex) });
    }
  }

  return tokens;
}
