import React from "react";
import { parseFormattedText } from "@/lib/parseFormattedText";

export const CODE_CLASS = [
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
].join(" ");

interface TheoryTextProps {
  text: string;
  className?: string;
}

export default function TheoryText({ text, className = "" }: TheoryTextProps) {
  const tokens = parseFormattedText(text);

  return (
    <p
      className={`text-sm text-gray-300 leading-relaxed whitespace-pre-wrap ${className}`}
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

          case "bold":
            return <strong key={index}>{token.value}</strong>;
          case "literal-backtick":
          case "text":
          default:
            return <React.Fragment key={index}>{token.value}</React.Fragment>;
        }
      })}
    </p>
  );
}
