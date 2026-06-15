import Link from "next/link";

// Thin localized (zh) variant for the /tools/* SEO landing pages. The full long-form
// article lives on the English route; the zh route gets a localized title + lead, a CTA
// into the actual tool (home), and a link to the full English guide — the standard
// ShuttleLab "localized thin page" pattern (handbook playbook 05 §8) that avoids shipping
// a wall of English under /zh while still giving zh users a real, indexable page.
export function ToolThinZh({
  title,
  lead,
  guideHref,
}: {
  title: string;
  lead: string;
  guideHref: string;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{lead}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/zh"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          立即免费使用
        </Link>
        <Link
          href={guideHref}
          className="inline-flex items-center px-6 py-3 border rounded-lg hover:bg-muted transition-colors"
        >
          查看完整英文指南 →
        </Link>
      </div>
    </div>
  );
}
