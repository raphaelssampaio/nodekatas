/**
 * TheoryText
 *
 * Renders a plain-text string that may contain backtick-enclosed segments
 * (e.g. `process.version`) as styled inline code spans.
 *
 * Algorithm:
 *   1. Split the string on every backtick character.
 *   2. Odd-indexed chunks (1, 3, 5 …) are the "inside-backtick" segments.
 *   3. Even-indexed chunks (0, 2, 4 …) are regular prose text.
 *
 * The component preserves newlines via `whitespace-pre-wrap` on the
 * wrapping element so multi-paragraph theory texts still look correct.
 */

import React from "react";

interface TheoryTextProps {
  /** The raw theory string, may contain `backtick-wrapped` code terms. */
  text: string;
  /** Extra class names forwarded to the wrapping <p> element. */
  className?: string;
}

export default function TheoryText({ text, className = "" }: TheoryTextProps) {
  const segments = text.split("`");

  return (
    <p
      className={`text-sm text-gray-300 leading-relaxed whitespace-pre-wrap ${className}`}
    >
      {segments.map((segment, index) => {
        const isCode = index % 2 === 1; // odd indices → inside backticks

        if (isCode) {
          return (
            <code
              key={index}
              className={[
                "font-mono",
                "text-emerald-300",
                "bg-gray-800",
                "border border-gray-700",
                "rounded",
                "px-1 py-0.5",
                "text-[0.8em]",
                "leading-none",
                "inline-block",
                "align-baseline",
              ].join(" ")}
            >
              {segment}
            </code>
          );
        }

        return <React.Fragment key={index}>{segment}</React.Fragment>;
      })}
    </p>
  );
}
