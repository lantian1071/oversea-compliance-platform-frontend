import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-lg mx-4 rounded-2xl bg-white/90 border border-border/60 shadow-elegant p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">页面不存在</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">请返回首页，或从顶部导航重新进入。</p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold">
            <Home className="w-4 h-4" />
            返回首页
          </button>
        </Link>
      </div>
    </div>
  );
}
