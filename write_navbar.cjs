const fs = require('fs');
const p = 'D:\\oversea_compliance_platform\\client\\src\\components\\Navbar.tsx';
const code = 
import { Bot, Building2, ChevronDown, Globe, LayoutDashboard, Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/i18n/LanguageContext';

const navLinks = [
  { href: '/qa', label: '\u667a\u80fd\u95ee\u7b54', icon: Bot },
  { href: '/suppliers', label: '\u627e\u670d\u52a1\u5546', icon: Search },
  { href: '/supplier-apply', label: '\u670d\u52a1\u5546\u5165\u9a7b', icon: Building2 },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isActive = (href) => location === href || location.startsWith(href + '/');

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
                <span className="font-serif font-bold text-foreground text-base leading-none block">\u51fa\u6d77\u5408\u89c4</span>
                <span className="text-[10px] text-muted-foreground leading-none">Global Compliance Platform</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ' + (isActive(link.href) ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60')}
                  >
                    <IconComponent className="w-4 h-4" />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'zh' ? '中文' : 'EN'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-elegant-lg border border-border/60 py-1 z-50">
                  <button
                    onClick={() => { setLanguage('zh'); setLangOpen(false); }}
                    className={'w-full text-left px-4 py-2 text-sm hover:bg-muted/60 transition-colors ' + (language === 'zh' ? 'text-primary font-medium' : 'text-foreground')}
                  >中文</button>
                  <button
                    onClick={() => { setLanguage('en'); setLangOpen(false); }}
                    className={'w-full text-left px-4 py-2 text-sm hover:bg-muted/60 transition-colors ' + (language === 'en' ? 'text-primary font-medium' : 'text-foreground')}
                  >English</button>
                </div>
              )}
            </div>
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
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/60 mb-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <button onClick={() => { setLanguage('zh'); setMobileOpen(false); }} className={'text-sm px-3 py-1 rounded-lg ' + (language === 'zh' ? 'bg-primary/8 text-primary font-medium' : 'text-muted-foreground')}>中文</button>
            <button onClick={() => { setLanguage('en'); setMobileOpen(false); }} className={'text-sm px-3 py-1 rounded-lg ' + (language === 'en' ? 'bg-primary/8 text-primary font-medium' : 'text-muted-foreground')}>EN</button>
          </div>
          {[...navLinks, { href: '/my-requests', label: '我的订单', icon: User }, { href: '/admin', label: '演示后台', icon: LayoutDashboard }].map((link) => {
            const IconComponent = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <span
                  className={'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer ' + (isActive(link.href) ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:bg-muted/60')}
                  onClick={() => setMobileOpen(false)}
                >
                  <IconComponent className="w-4 h-4" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
;
fs.writeFileSync(p, code.trimStart(), 'utf8');
console.log('Written');