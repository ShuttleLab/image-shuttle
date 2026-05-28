"use client";

import { useTranslations } from "next-intl";
import {
  Shield,
  Zap,
  RefreshCw,
  Layers,
  Sliders,
  Eye,
  Upload,
  Settings,
  Download,
  Lock,
  Globe,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageCompressor } from "@/components/image-compressor";

const features = [
  { icon: Shield, titleKey: "feature1Title", descKey: "feature1Desc" },
  { icon: Zap, titleKey: "feature2Title", descKey: "feature2Desc" },
  { icon: RefreshCw, titleKey: "feature3Title", descKey: "feature3Desc" },
  { icon: Layers, titleKey: "feature4Title", descKey: "feature4Desc" },
  { icon: Sliders, titleKey: "feature5Title", descKey: "feature5Desc" },
  { icon: Eye, titleKey: "feature6Title", descKey: "feature6Desc" },
];

const steps = [
  { icon: Upload, titleKey: "step1Title", descKey: "step1Desc" },
  { icon: Settings, titleKey: "step2Title", descKey: "step2Desc" },
  { icon: Download, titleKey: "step3Title", descKey: "step3Desc" },
];

const formats = ["JPEG", "PNG", "WebP", "AVIF"];

export function HomeContent() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          {t("home.title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          {t("home.subtitle")}
        </p>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Lock className="size-4" />
          {t("home.privacyBadge")}
        </div>

        {/* Supported Formats */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">
            {t("home.supportedFormats")}:
          </span>
          {formats.map((format) => (
            <Badge key={format} variant="secondary">
              {format}
            </Badge>
          ))}
        </div>
      </section>

      {/* Image Compressor Tool */}
      <section className="mb-20">
        <ImageCompressor />
      </section>

      {/* Features */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t("home.featuresHeading")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <Card key={titleKey} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-base">{t(`home.${titleKey}`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`home.${descKey}`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Image Compression Matters */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("home.whyCompressionTitle")}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t("home.whyCompressionP1")}</p>
          <p>{t("home.whyCompressionP2")}</p>
        </div>
      </section>

      {/* How Image Shuttle Differs */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("home.howDifferentTitle")}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t("home.howDifferentP1")}</p>
          <p>{t("home.howDifferentP2")}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t("home.howItWorks")}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {steps.map(({ icon: Icon, titleKey, descKey }, index) => (
            <div key={titleKey} className="flex flex-col items-center text-center max-w-[200px]">
              <div className="relative mb-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Icon className="size-6 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{t(`home.${titleKey}`)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`home.${descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Trust Signals */}
      <section className="text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="size-5 text-primary" />
            </div>
            <p className="text-sm font-medium">{t("home.statsPrivate")}</p>
            <p className="text-xs text-muted-foreground">
              {t("home.feature1Desc")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Globe className="size-5 text-primary" />
            </div>
            <p className="text-sm font-medium">{t("home.feature3Title")}</p>
            <p className="text-xs text-muted-foreground">
              {t("home.feature3Desc")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="size-5 text-primary" />
            </div>
            <p className="text-sm font-medium">{t("home.feature2Title")}</p>
            <p className="text-xs text-muted-foreground">
              {t("home.feature2Desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
