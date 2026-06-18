/**
 * FormattedText
 *
 * Generic rich-text renderer for any exercise text field (typically
 * `instructions`) that may contain backtick-enclosed inline code spans.
 *
 * Uses the same robust `parseFormattedText` parser as `TheoryText`, so it
 * correctly handles all edge cases including:
 *   - Inline code spans:             `value`
 *   - Literal backtick display:      `` ` ``
 *   - Indented verbatim code lines:  lines starting with 2+ spaces
 *
 * ## Styling differences from TheoryText
 * Instructions sit in a highlighted card with `text-gray-200`, so this
 * component uses slightly brighter base text while keeping the same
 * emerald code-span aesthetic.
 */

import React from "react";
import { parseFormattedText } from "@/lib/parseFormattedText";
import { CODE_CLASS } from "@/components/TheoryText";

interface FormattedTextProps {
  /** The raw instruction / theory string. */
  text: string;
  /** Extra Tailwind class names forwarded to the wrapping <p> element. */
  className?: string;
}

export default function FormattedText({ text, className = "" }: FormattedTextProps) {
  const tokens = parseFormattedText(text);

  return (
    <p
      className={`text-sm text-gray-200 leading-relaxed whitespace-pre-wrap ${className}`}
    >
      {tokens.map((token, index) => {
        switch (token.type) {
          case "newline":
            return <br key={index} />;

          case "code":
            return (
              <code key={index} className={CODE_CLASS}>
                {token.value}
              </code>
            );

          // literal-backtick and plain text → render as-is
          case "literal-backtick":
          case "text":
          default:
            return <React.Fragment key={index}>{token.value}</React.Fragment>;
        }
      })}
    </p>
  );
}
