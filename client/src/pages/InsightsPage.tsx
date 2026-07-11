import { insightReports } from "@/data/staticData";
import { ArrowRight, BarChart3, Calendar, LineChart, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0c1a38] text-white">
        <div className="container py-12">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/"><span className="hover:text-white cursor-pointer">首页</span></Link>
            <span>/</span>
            <span className="text-white">洞察报告</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold">目的地国服务洞察报告</h1>
          </div>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            展示需求分布、价格区间、风险趋势和客户画像，帮助服务商理解中国出海企业需求。
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-5">
          {insightReports.map((report) => (
            <Link key={report.id} href={`/insights/${report.id}`}>
              <article className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant card-hover cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary">
                    <LineChart className="w-3 h-3" />
                    {report.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {report.publishedAt}
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg text-foreground mb-2">{report.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{report.summary}</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {report.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl bg-muted/60 p-3">
                      <div className="text-sm font-serif font-bold text-foreground">{metric.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  查看报告 <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-elegant">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h2 className="font-serif font-bold text-foreground mb-1">洞察订阅权益</h2>
              <p className="text-sm text-muted-foreground">正式版可根据套餐展示需求洞察、价格洞察、客户画像和中文沟通辅助。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
