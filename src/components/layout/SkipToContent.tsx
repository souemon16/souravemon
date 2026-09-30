// FILE: src/components/layout/SkipToContent.tsx

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-signal focus:text-base focus:px-4 focus:py-2 focus:rounded-md font-mono text-sm"
    >
      Skip to content
    </a>
  );
}