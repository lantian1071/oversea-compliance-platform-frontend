import { serviceRequests } from "@/data/staticData";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, Clock, FileText, MapPin, MessageSquare } from "lucide-react";
import { Link } from "wouter";

const statusConfig = {
  pending: { label: "待处理", color: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="w-3.5 h-3.5" /> },
  contacted: { label: "已联系", color: "bg-blue-50 text-blue-700 border-blue-200", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  in_progress: { label: "进行中", color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: <Briefcase className="w-3.5 h-3.5" /> },
  completed: { label: "已完成", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

export default function MyRequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/60 bg-white/80 backdrop-blur-sm">
        <div className="container py-6">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">我的服务订单</h1>
          <p className="text-muted-foreground text-sm">这里展示静态演示订单。正式版可接入登录和数据库。</p>
        </div>
      </div>

      <div className="container py-8">
        {serviceRequests.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">暂无服务订单</h3>
            <p className="text-muted-foreground mb-6">可以先浏览服务商并发起询价。</p>
            <Link href="/suppliers">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                浏览服务商
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {serviceRequests.map((request) => {
              const status = statusConfig[request.status] ?? statusConfig.pending;
              return (
                <div key={request.id} className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-foreground mb-1">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        服务商：<span className="text-foreground font-medium">{request.supplierName}</span>
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border flex-shrink-0 ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{request.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {request.targetCountry}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {request.serviceType}
                    </span>
                    <span>预算：{request.budget}</span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(request.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  {request.adminNote && (
                    <div className="mt-4 pt-4 border-t border-border/60">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">平台备注</p>
                      <p className="text-sm text-foreground">{request.adminNote}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
