import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import { SvgToPngApp } from "@/components/svg-to-png-app";

const PATH = "/svg-to-png";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "svgToPng" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
  };
}

export default async function SvgToPngPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === "zh";
  // Long-form prose exists only in en/zh. Other locales still get the fully
  // localized tool + H1 + subtitle (from messages), just without an English wall.
  const showProse = locale === "en" || locale === "zh";
  const t = await getTranslations({ locale, namespace: "svgToPng" });

  const steps = zh
    ? [
        { h: "拖入 SVG", p: "把 SVG 文件拖到上传区,或点击选择;也可以直接粘贴 SVG 代码。文件不会上传到任何服务器,全部在你的浏览器本地处理。" },
        { h: "设置尺寸与背景", p: "选择输出格式(PNG/WebP/JPG),自定义宽高或直接勾选常用图标尺寸,背景可保持透明或指定纯色。" },
        { h: "下载", p: "单张下载,或勾选多个图标档位一键打包成 ZIP。全程无水印、无需注册。" },
      ]
    : [
        { h: "Drop your SVG", p: "Drag an SVG file onto the upload area or click to browse — you can also paste raw SVG code. Nothing is uploaded; everything runs locally in your browser." },
        { h: "Set size & background", p: "Pick an output format (PNG/WebP/JPG), enter custom width/height or tick common icon sizes, and keep the background transparent or set a solid color." },
        { h: "Download", p: "Download a single file, or select multiple icon sizes and export them all as a ZIP. No watermark, no sign-up." },
      ];

  const faqs = zh
    ? [
        { q: "SVG 转 PNG 会不会上传我的文件?", a: "不会。转换完全在你的浏览器里用 Canvas 完成,SVG 从不离开你的设备,100% 私密,适合处理机密图标和商业素材。" },
        { q: "转换后能保留透明背景吗?", a: "可以。PNG 和 WebP 输出默认保留透明背景;若选择 JPG(不支持透明),会自动补上你指定的纯色底,避免透明区变黑。" },
        { q: "可以从一个 SVG 生成整套图标/favicon 吗?", a: "可以。勾选 16/32/48/64/128/256/512 中任意档位,点击打包下载,即可得到一个包含全部尺寸 PNG 的 ZIP,适合做网站 favicon 和 App 图标。" },
        { q: "输出尺寸有上限吗?", a: "单边最大支持 8192 像素。由于是矢量转位图,放大到任意尺寸都保持清晰,不会像放大位图那样发虚。" },
        { q: "只有 viewBox、没有宽高的 SVG 能转吗?", a: "能。工具会自动从 viewBox 推导出尺寸并补上宽高属性,兼容各浏览器(包括 Firefox)的渲染。" },
        { q: "支持哪些输出格式?", a: "PNG(默认,最通用)、WebP(体积更小)、JPG(适合无透明的场景)。图标打包统一输出为 PNG。" },
      ]
    : [
        { q: "Does this SVG to PNG converter upload my files?", a: "No. Conversion happens entirely in your browser via Canvas — your SVG never leaves your device. It's 100% private, safe for confidential icons and commercial assets." },
        { q: "Is transparency preserved after converting?", a: "Yes. PNG and WebP output keep the transparent background by default. If you pick JPG (which has no alpha channel), a solid color you choose is filled in so transparent areas don't turn black." },
        { q: "Can I generate a full icon/favicon set from one SVG?", a: "Yes. Tick any of 16/32/48/64/128/256/512 and download them together as a ZIP of PNGs — perfect for website favicons and app icons." },
        { q: "Is there an output size limit?", a: "Up to 8192 px per side. Because it's vector-to-raster, you can scale to any size and stay razor-sharp — no blurriness like upscaling a bitmap." },
        { q: "Can I convert an SVG that only has a viewBox and no width/height?", a: "Yes. The tool derives the size from the viewBox and injects width/height so it renders correctly across browsers, including Firefox." },
        { q: "Which output formats are supported?", a: "PNG (default, most compatible), WebP (smaller files), and JPG (for cases without transparency). Icon set exports are always PNG." },
      ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: zh ? "SVG 转 PNG 转换器" : "SVG to PNG Converter",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    url: canonicalUrl(locale, PATH),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t("metaDesc"),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: zh ? "如何把 SVG 转成 PNG" : "How to Convert SVG to PNG",
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.h, text: s.p })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {showProse && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-8">
          <SvgToPngApp />
        </div>

        {showProse && (
          <>
        {/* How it works */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">{zh ? "如何把 SVG 转成 PNG" : "How to Convert SVG to PNG"}</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{s.h}</h3>
                  <p className="text-muted-foreground">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Why */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">{zh ? "为什么用它" : "Why use this converter"}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(zh
              ? [
                  { h: "100% 私密", p: "全程浏览器本地处理,SVG 不上传服务器,机密素材也放心。" },
                  { h: "矢量转位图,任意尺寸都清晰", p: "从一张 SVG 导出到 512、1024 乃至更大,边缘依旧锐利。" },
                  { h: "一键生成图标全套", p: "常用 favicon / App 图标尺寸勾选即得,打包 ZIP 下载。" },
                  { h: "多格式输出", p: "PNG / WebP / JPG 任选,透明或纯色底自由控制。" },
                ]
              : [
                  { h: "100% private", p: "Everything runs locally in your browser — your SVG is never uploaded, safe for confidential assets." },
                  { h: "Vector to raster, crisp at any size", p: "Export one SVG to 512, 1024, or larger and keep edges razor-sharp." },
                  { h: "One-click icon set", p: "Tick common favicon / app-icon sizes and download them all as a ZIP." },
                  { h: "Multiple formats", p: "Choose PNG, WebP, or JPG, with transparent or solid backgrounds." },
                ]
            ).map((b, i) => (
              <div key={i} className="rounded-lg border p-4">
                <h3 className="mb-1 font-semibold">{b.h}</h3>
                <p className="text-sm text-muted-foreground">{b.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">{zh ? "常见问题" : "Frequently Asked Questions"}</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold">{f.q}</h3>
                <p className="text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </div>
    </>
  );
}
