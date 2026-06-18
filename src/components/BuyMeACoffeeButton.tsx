export default function BuyMeACoffeeButton() {
  return (
    <a
      href="https://buymeacoffee.com/rsscode"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-black bg-[#FFDD00] hover:bg-[#e6c700] transition-colors"
    >
      <span>☕</span>
      <span className="hidden sm:inline">Buy me a coffee</span>
    </a>
  );
}
