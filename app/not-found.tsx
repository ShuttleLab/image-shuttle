import Link from "next/link";

const SUGGESTIONS = [
  { name: "Compress JPG", href: "/tools/compress-jpg" },
  { name: "Compress PNG", href: "/tools/compress-png" },
  { name: "Convert to WebP", href: "/tools/convert-to-webp" },
];

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4">🖼️</div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-1">Page not found</p>
        <p className="text-muted-foreground mb-8 text-sm">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90"
        >
          Back to Home
        </Link>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">
            Try our tools
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center text-sm">
            {SUGGESTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
