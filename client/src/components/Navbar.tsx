import { Bot, Building2, Globe, LayoutDashboard, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/qa", label: "智能问答", icon: <Bot className="w-4 h-4" /> },
  { href: "/suppliers", label: "找服务商", icon: <Search className="w-4 h-4" /> },
  { href: "/supplier-apply", label: "服务商入驻", icon: <Building2 className="w-4 h-4" /> },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (href: string) => location === href || location.startsWith(`${href}/`);

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
                <span className="font-serif font-bold text-foreground text-base leading-none block">出海合规</span>
                <span className="text-[10px] text-muted-foreground leading-none">Global Compliance Platform</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive(link.href)
                      ? "bg-primary/8 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
                <LayoutDashboard className="w-4 h-4" />
                演示后台
              </span>
            </Link>
            <Link href="/my-requests">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer">
                <User className="w-4 h-4" />
                我的订单
              </span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="打开导航"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-white px-4 py-4 space-y-1">
          {[...navLinks, { href: "/my-requests", label: "我的订单", icon: <User className="w-4 h-4" /> }, { href: "/admin", label: "演示后台", icon: <LayoutDashboard className="w-4 h-4" /> }].map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer ${
                  isActive(link.href) ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-muted/60"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
