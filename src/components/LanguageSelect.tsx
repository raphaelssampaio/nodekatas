"use client";

import type { Language } from "@/lib/types";

interface Props {
  value: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Language)}
      className="text-xs font-medium bg-gray-900 border border-gray-700 rounded-md px-2 py-1 hover:border-gray-500 focus:outline-none"
    >
      <option value="en">English</option>
      <option value="pt">Português Brasileiro</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
      <option value="it">Italiano</option>
      <option value="fr">Français</option>
    </select>
  );
}
