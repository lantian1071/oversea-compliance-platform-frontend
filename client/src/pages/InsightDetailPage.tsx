import { getInsightReportById } from "@/data/staticData";
import { ArrowLeft, BarChart3, CheckCircle2, FileText } from "lucide-react";
import { Link, useParams } from "wouter";

export default function InsightDetailPage() {
  const { id } = useParams<{ id: string }>();
  const report = getInsightReportById(Number(id));

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-4">报告不存在</h1>
          <Link href="/insights"><button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">返回洞察报告</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/60 bg-white/80 backdrop-blur-sm">
        <div className="container py-3">
          <Link href="/insights">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              返回洞察报告
            </button>
          </Link>
        </div>
      </div>

      <article className="container py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary mb-4">
            <BarChart3 className="w-3 h-3" />
            {report.category} / {report.region}
          </span>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">{report.title}</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">{report.summary}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {report.metrics.map((metric) => (
            <div key={metric.label} className="bg-card rounded-2xl border border-border/60 p-5 shadow-elegant">
              <div className="text-3xl font-serif font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm font-medium text-foreground">{metric.label}</div>
              <div className="text-xs text-muted-foreground mt-2">{metric.trend}</div>
            </div>
          ))}
        </div>

        <section className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
          <h2 className="font-serif font-bold text-foreground text-xl mb-5">核心发现</h2>
          <div className="space-y-3">
            {report.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
