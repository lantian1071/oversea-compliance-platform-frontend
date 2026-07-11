import { Bot, Building2, ChevronDown, Globe, LayoutDashboard, Menu, Search, User, X, FileText, BarChart3, Briefcase, Grid3X3 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isActive = (href) => location === href || location.startsWith(href + "/");

  const t = (zh, en) => language === "en" ? en : zh;

  const navLinks = [
    { href: "/qa", label: t("\u667a\u80fd\u95ee\u7b54", "AI Q&A"), icon: Bot },
    { href: "/suppliers", label: t("\u627e\u670d\u52a1\u5546", "Find Providers"), icon: Search },
    { href: "/supplier-apply", label: t("\u670d\u52a1\u5546\u5165\u9a7b", "Provider Onboarding"), icon: Building2 },
  ];

  const moreLinks = [
    { href: "/publish-request", label: t("\u53d1\u5e03\u9700\u6c42", "Post Demand"), icon: FileText },
    { href: "/supplier-apply", label: t("\u670d\u52a1\u5546\u5165\u9a7b", "Provider Onboarding"), icon: Building2 },
    { href: "/products", label: t("\u670d\u52a1\u4ea7\u54c1", "Service Products"), icon: Briefcase },
    { href: "/brands", label: t("\u54c1\u724c\u5c55\u793a", "Brand Pages"), icon: Grid3X3 },
    { href: "/insights", label: t("\u6d1e\u5bdf\u62a5\u544a", "Insights"), icon: BarChart3 },
    { href: "/workbench", label: t("\u670d\u52a1\u5546\u5de5\u4f5c\u53f0", "Provider Workbench"), icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.18_0.04_240)] flex items-center justify-center">
                <Globe className="w-4 h-4 text-[oklch(0.82_0.12_75)]" />
              </div>
              <div>
                <span className="font-serif font-bold text-foreground text-base leading-none block">{t("\u51fa\u6d77\u5408\u89c4", "Overseas Compliance")}</span>
                <span className="text-[10px] text-muted-foreground leading-none">Global Compliance Platform</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive(link.href) ? "bg-primary/8 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`}>
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${moreLinks.some(l => isActive(l.href)) ? "bg-primary/8 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`}
              >
                {t("\u66f4\u591a", "More")}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-elegant-lg border border-border/60 py-1 z-50"
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  {moreLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-colors ${isActive(link.href) ? "text-primary font-medium bg-primary/5" : "text-foreground hover:bg-muted/60"}`}
                        onClick={() => setMoreOpen(false)}
                      >
                        <link.icon className="w-4 h-4 text-muted-foreground" />
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                <Globe className="w-4 h-4" />
                <span>{language === "zh" ? "中文" : "EN"}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-elegant-lg border border-border/60 py-1 z-50">
                  <button onClick={() => { setLanguage("zh"); setLangOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/60 transition-colors ${language === "zh" ? "text-primary font-medium" : "text-foreground"}`}>中文</button>
                  <button onClick={() => { setLanguage("en"); setLangOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/60 transition-colors ${language === "en" ? "text-primary font-medium" : "text-foreground"}`}>English</button>
                </div>
              )}
            </div>
            <Link href="/admin">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
                <LayoutDashboard className="w-4 h-4" />{t("\u6f14\u793a\u540e\u53f0", "Admin Demo")}
              </span>
            </Link>
            <Link href="/my-requests">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer">
                <User className="w-4 h-4" />{t("\u6211\u7684\u8ba2\u5355", "My Orders")}
              </span>
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors" onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-white px-4 py-4 space-y-1">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/60 mb-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <button onClick={() => { setLanguage("zh"); setMobileOpen(false); }} className={`text-sm px-3 py-1 rounded-lg ${language === "zh" ? "bg-primary/8 text-primary font-medium" : "text-muted-foreground"}`}>中文</button>
            <button onClick={() => { setLanguage("en"); setMobileOpen(false); }} className={`text-sm px-3 py-1 rounded-lg ${language === "en" ? "bg-primary/8 text-primary font-medium" : "text-muted-foreground"}`}>EN</button>
          </div>
          {[...navLinks, ...moreLinks, { href: "/my-requests", label: t("\u6211\u7684\u8ba2\u5355", "My Orders"), icon: User }, { href: "/admin", label: t("\u6f14\u793a\u540e\u53f0", "Admin Demo"), icon: LayoutDashboard }].map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer ${isActive(link.href) ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-muted/60"}`} onClick={() => setMobileOpen(false)}>
                <link.icon className="w-4 h-4" />{link.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
