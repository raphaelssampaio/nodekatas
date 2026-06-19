import React from "react";
import { parseFormattedText } from "@/lib/parseFormattedText";
import { CODE_CLASS } from "@/components/TheoryText";

interface FormattedTextProps {
  text: string;
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
