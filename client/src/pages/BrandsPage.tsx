import { brandProfiles } from "@/data/staticData";
import { ArrowRight, Building2, CheckCircle2, Eye, Globe, Languages, Monitor, Smartphone, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const statusText = {
  published: "已发布",
  draft: "草稿",
  archived: "已归档",
};

const templates = [
  { code: "premium-asia", name: "综合服务版", desc: "适合 relocation、签证、薪酬社保等一站式服务商。" },
  { code: "trust-advisory", name: "专业顾问版", desc: "突出资质、案例、风险诊断和长期顾问能力。" },
  { code: "market-entry", name: "市场落地版", desc: "适合公司注册、银行开户、园区落地和本地运营服务。" },
];

export default function BrandsPage() {
  const [activeId, setActiveId] = useState(brandProfiles[0]?.id ?? 1);
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [published, setPublished] = useState<Record<number, boolean>>({});
  const activeProfile = useMemo(() => brandProfiles.find((profile) => profile.id === activeId) ?? brandProfiles[0], [activeId]);
  const activeTemplate = templates.find((template) => template.code === activeProfile.templateCode) ?? templates[0];
  const isPublished = published[activeProfile.id] ?? activeProfile.status === "published";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0c1a38] text-white">
        <div className="container py-12">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/"><span className="hover:text-white cursor-pointer">首页</span></Link>
            <span>/</span>
            <span className="text-white">品牌展示</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold">服务商品牌页演示</h1>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            根据需求文件，这里演示白标品牌页：出海企业看到的是服务商自己的品牌、中文介绍、服务项目、价格和联系入口。
          </p>
        </div>
      </div>

      <div className="container py-8 space-y-6">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4">
            <section className="bg-card rounded-2xl border border-border/60 p-4 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground mb-3">选择服务商</h2>
              <div className="space-y-2">
                {brandProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setActiveId(profile.id)}
                    className={`w-full text-left rounded-xl border p-3 transition-all ${
                      activeId === profile.id ? "border-primary/50 bg-primary/5" : "border-border/60 hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{profile.companyName}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{profile.headline}</p>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${profile.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {published[profile.id] ? "已发布" : statusText[profile.status]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border/60 p-4 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground mb-3">模板选择</h2>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.code}
                    className={`rounded-xl border p-3 ${template.code === activeTemplate.code ? "border-primary/50 bg-primary/5" : "border-border/60"}`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {template.code === activeTemplate.code && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {template.name}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{template.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <section className="bg-card rounded-2xl border border-border/60 shadow-elegant overflow-hidden">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 p-4">
              <div>
                <h2 className="font-serif font-bold text-foreground">白标品牌页预览</h2>
                <p className="text-xs text-muted-foreground mt-1">预览地址：supplier-brand.com/{activeProfile.supplierId}?lang={language}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setLanguage(language === "zh" ? "en" : "zh")} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/60 text-sm">
                  <Languages className="w-4 h-4" />
                  {language === "zh" ? "中文" : "English"}
                </button>
                <button onClick={() => setDevice(device === "desktop" ? "mobile" : "desktop")} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/60 text-sm">
                  {device === "desktop" ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {device === "desktop" ? "桌面预览" : "手机预览"}
                </button>
                <button
                  onClick={() => setPublished((current) => ({ ...current, [activeProfile.id]: !isPublished }))}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                >
                  {isPublished ? "保存草稿" : "发布页面"}
                </button>
              </div>
            </div>

            <div className="p-5 bg-muted/40">
              <div className={`mx-auto bg-white border border-border/60 shadow-elegant overflow-hidden ${device === "mobile" ? "max-w-[360px] rounded-[28px]" : "max-w-4xl rounded-2xl"}`}>
                <div className="bg-[oklch(0.18_0.04_240)] text-white p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-serif font-bold">{activeProfile.companyName.charAt(0)}</div>
                      <div>
                        <h3 className="font-serif font-bold text-xl">{language === "zh" ? activeProfile.companyName : `${activeProfile.companyName} China Desk`}</h3>
                        <p className="text-xs text-slate-300 mt-1">{activeTemplate.name}</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-white/10">{isPublished ? "Public" : "Draft"}</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold mt-8 mb-3">{language === "zh" ? activeProfile.headline : "Trusted destination service partner for Chinese companies"}</h4>
                  <p className="text-sm leading-relaxed text-slate-300 max-w-2xl mx-auto">
                    {language === "zh" ? activeProfile.intro : "We provide localized support for Chinese companies entering the destination market, including service design, delivery coordination and bilingual communication."}
                  </p>
                </div>

                <div className="p-6 grid md:grid-cols-3 gap-4">
                  {activeProfile.services.split(",").map((service) => (
                    <div key={service} className="rounded-xl border border-border/60 p-4">
                      <p className="text-sm font-semibold text-foreground">{language === "zh" ? service : "Destination service"}</p>
                      <p className="text-xs text-muted-foreground mt-2">{language === "zh" ? "面向中国出海企业，提供清晰交付物和响应承诺。" : "Clear deliverables and response commitment for Chinese clients."}</p>
                    </div>
                  ))}
                </div>

                <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">覆盖地区</p>
                    <p className="text-sm text-foreground">{activeProfile.countries.split(",").join(" / ")}</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">联系表单</p>
                    <p className="text-sm text-foreground">提交后通知服务商，ChainTrack 对外不可见。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h2 className="font-serif font-bold text-foreground mb-1">需求文件中的白标规则已体现在页面里</h2>
              <p className="text-sm text-muted-foreground">公众品牌页不出现 ChainTrack，后台和服务商工作台才保留平台标识。</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/suppliers/${activeProfile.supplierId}`}>
              <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border/60 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                查看服务商
              </button>
            </Link>
            <Link href="/supplier-apply">
              <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                申请入驻 <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
