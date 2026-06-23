import { countries, filterSuppliers, platformStats } from "@/data/staticData";
import {
  ArrowRight,
  Award,
  Bot,
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: <Bot className="w-7 h-7" />,
    title: "智能合规问答",
    desc: "围绕出海用工、签证、薪酬和社保问题提供即时参考，适合企业 HR 快速梳理问题。",
    href: "/qa",
    cta: "立即咨询",
    color: "from-blue-50 to-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "查找服务商",
    desc: "按国家和服务类型筛选合规服务商，查看服务范围、案例数量、评分和联系方式。",
    href: "/suppliers",
    cta: "浏览目录",
    color: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: "服务商入驻",
    desc: "服务商可以提交入驻资料。静态版本会在浏览器内完成表单演示，不依赖服务器。",
    href: "/supplier-apply",
    cta: "提交申请",
    color: "from-emerald-50 to-teal-50",
    iconColor: "text-emerald-600",
  },
];

const advantages = [
  { icon: <Shield className="w-5 h-5" />, title: "专业可信", desc: "清晰展示服务商能力、覆盖区域和服务边界。" },
  { icon: <Globe className="w-5 h-5" />, title: "全球覆盖", desc: "覆盖主流出海目的地，便于快速筛选。" },
  { icon: <Zap className="w-5 h-5" />, title: "快速使用", desc: "静态部署后打开即用，无需服务器。" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "易于扩展", desc: "后续可以接入腾讯云函数或外部接口。" },
];

export default function Home() {
  const featuredSuppliers = filterSuppliers().slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container relative py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.82_0.12_75/0.3)] bg-[oklch(0.82_0.12_75/0.08)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.82_0.12_75)]" />
              <span className="text-sm font-medium text-[oklch(0.88_0.1_75)]">适合腾讯云静态网站托管的前端版本</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              出海合规，<span className="text-gradient-gold">一站式查询</span>
            </h1>
            <p className="text-lg lg:text-xl text-[oklch(0.75_0.02_240)] leading-relaxed mb-10 max-w-2xl mx-auto">
              服务商目录、合规问答、入驻申请和订单演示都已改为纯前端运行，适合上传到腾讯云静态托管。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/suppliers">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[oklch(0.82_0.12_75)] text-[oklch(0.18_0.04_240)] font-semibold hover:bg-[oklch(0.78_0.15_75)] transition-all shadow-elegant">
                  <Search className="w-5 h-5" />
                  浏览服务商
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/qa">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                  <Bot className="w-5 h-5" />
                  试用问答
                </button>
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: `${platformStats.supplierCount}+`, label: "认证服务商" },
                { value: `${platformStats.requestCount}+`, label: "撮合订单" },
                { value: `${platformStats.countryCount}+`, label: "覆盖国家" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl font-bold text-[oklch(0.88_0.1_75)] font-serif">{item.value}</div>
                  <div className="text-sm text-[oklch(0.65_0.02_240)] mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">平台核心服务</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">从合规咨询到服务商匹配，覆盖企业出海 HR 的常见工作流。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className={`group rounded-2xl p-8 bg-gradient-to-br ${feature.color} border border-border/60 card-hover cursor-pointer shadow-elegant h-full`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm mb-6 ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{feature.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {feature.cta}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/40">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">全球服务覆盖</h2>
            <p className="text-muted-foreground">点击国家可以直接筛选服务商目录。</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.slice(0, 12).map((country) => (
              <Link key={country} href={`/suppliers?country=${encodeURIComponent(country)}`}>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border/60 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  {country}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">精选推荐</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-foreground">金牌服务商</h2>
            </div>
            <Link href="/suppliers">
              <button className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                查看全部 <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSuppliers.map((supplier) => (
              <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
                <div className="group bg-card rounded-2xl border border-border/60 p-6 card-hover shadow-elegant cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary font-bold text-lg font-serif">
                      {supplier.companyName.charAt(0)}
                    </div>
                    {supplier.isSigned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-gold">
                        <Award className="w-3 h-3" />
                        金牌
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-1 group-hover:text-primary">{supplier.companyName}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{supplier.companyNameEn}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{supplier.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{supplier.coverageCountries.split(",").slice(0, 3).join(" / ")}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold">{supplier.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{supplier.caseCount} 个案例</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">为什么选择这个版本</h2>
            <p className="text-[oklch(0.7_0.02_240)] text-lg">它已经去掉服务器依赖，可以直接上传静态托管。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[oklch(0.82_0.12_75/0.15)] text-[oklch(0.88_0.1_75)] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[oklch(0.65_0.02_240)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10 bg-muted/30">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-foreground">出海合规服务平台</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/qa">智能问答</Link>
            <Link href="/suppliers">服务商目录</Link>
            <Link href="/supplier-apply">服务商入驻</Link>
          </div>
          <p className="text-sm text-muted-foreground">2026 出海合规服务平台</p>
        </div>
      </footer>
    </div>
  );
}
