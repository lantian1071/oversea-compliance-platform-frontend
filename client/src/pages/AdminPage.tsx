import { platformStats, serviceRequests, suppliers } from "@/data/staticData";
import { Award, Briefcase, Building2, CheckCircle2, Clock, RefreshCw, Shield, Star, TrendingUp } from "lucide-react";

const statusLabels: Record<string, string> = {
  pending: "待处理",
  approved: "已通过",
  contacted: "已联系",
  in_progress: "进行中",
  completed: "已完成",
};

export default function AdminPage() {
  const pendingSuppliers = suppliers.filter((item) => item.status === "pending").length;
  const pendingRequests = serviceRequests.filter((item) => item.status === "pending").length;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold mb-1">演示后台</h1>
              <p className="text-[oklch(0.65_0.02_240)] text-sm">静态托管版本展示后台结构，不执行真实审批。</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-sm">
              <Shield className="w-4 h-4 text-[oklch(0.82_0.12_75)]" />
              静态演示
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "认证服务商", value: platformStats.supplierCount, icon: <Building2 className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "待审核申请", value: pendingSuppliers, icon: <Clock className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "撮合订单总数", value: platformStats.requestCount, icon: <Briefcase className="w-5 h-5" />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "已完成订单", value: platformStats.completedCount, icon: <CheckCircle2 className="w-5 h-5" />, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4`}>{item.icon}</div>
              <div className="text-3xl font-bold text-foreground font-serif mb-1">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif font-bold text-foreground text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                服务商管理
              </h2>
              <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4" />
                演示数据
              </button>
            </div>
            <div className="space-y-3">
              {suppliers.slice(0, 4).map((supplier) => (
                <div key={supplier.id} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif font-bold text-foreground">{supplier.companyName}</h3>
                      <p className="text-xs text-muted-foreground">{supplier.contactEmail}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {statusLabels[supplier.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    {supplier.isSigned && (
                      <span className="inline-flex items-center gap-1 badge-gold px-2 py-0.5 rounded-full">
                        <Award className="w-3 h-3" />
                        金牌
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {supplier.rating}
                    </span>
                    <span>{supplier.caseCount} 案例</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
            <h2 className="font-serif font-bold text-foreground text-xl mb-5 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              订单管理
            </h2>
            <div className="space-y-3">
              {serviceRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-foreground">{request.title}</h3>
                      <p className="text-xs text-muted-foreground">服务商：{request.supplierName}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {statusLabels[request.status]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
                </div>
              ))}
              <div className="text-sm text-muted-foreground bg-muted/60 rounded-xl p-4">
                正式部署如果需要后台审批，请把提交和审批动作接入服务器接口。纯静态网站只能展示和本地交互。
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
