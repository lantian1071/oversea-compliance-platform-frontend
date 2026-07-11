import { brandProfiles, serviceProducts, serviceRequests, suppliers } from "@/data/staticData";
import { Award, BarChart3, Briefcase, Building2, CheckCircle2, Eye, PackageCheck, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const tabs = [
  { key: "requests", label: "撮合记录" },
  { key: "products", label: "服务产品" },
  { key: "brand", label: "品牌页" },
  { key: "insights", label: "洞察权益" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function SupplierWorkbenchPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("requests");
  const supplier = suppliers[0];
  const products = serviceProducts.filter((item) => item.supplierName === supplier.companyName);
  const brand = brandProfiles.find((item) => item.supplierId === supplier.id);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[oklch(0.82_0.12_75)]" />
                <span className="text-sm text-[oklch(0.75_0.02_240)]">服务商工作台</span>
              </div>
              <h1 className="text-2xl font-serif font-bold">{supplier.companyName}</h1>
              <p className="text-sm text-[oklch(0.7_0.02_240)] mt-1">管理撮合记录、服务产品、品牌页和洞察订阅权益。</p>
            </div>
            <Link href={`/suppliers/${supplier.id}`}>
              <button className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/15">预览服务商主页</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "待跟进需求", value: serviceRequests.length, icon: <Briefcase className="w-5 h-5" /> },
            { label: "服务产品", value: products.length, icon: <PackageCheck className="w-5 h-5" /> },
            { label: "品牌页浏览", value: brand?.viewCount ?? 0, icon: <Eye className="w-5 h-5" /> },
            { label: "金牌状态", value: supplier.isSigned ? "已签约" : "未签约", icon: <Award className="w-5 h-5" /> },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-2xl border border-border/60 p-5 shadow-elegant">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-3">{item.icon}</div>
              <div className="text-2xl font-serif font-bold text-foreground">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border/60 shadow-elegant overflow-hidden">
          <div className="flex overflow-x-auto border-b border-border/60">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap ${activeTab === tab.key ? "text-primary border-b-2 border-primary bg-primary/4" : "text-muted-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "requests" && (
              <div className="space-y-3">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="rounded-xl border border-border/60 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h2 className="font-serif font-bold text-foreground">{request.title}</h2>
                        <p className="text-xs text-muted-foreground">{request.targetCountry} / {request.serviceType} / 预算：{request.budget}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{request.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "products" && (
              <div className="grid md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="rounded-xl border border-border/60 p-4">
                    <h2 className="font-serif font-bold text-foreground mb-1">{product.title}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{product.summary}</p>
                    <div className="flex items-center justify-between text-xs border-t border-border/60 pt-3">
                      <span className="font-semibold text-emerald-600">{product.price}</span>
                      <span className="text-muted-foreground">{product.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "brand" && (
              brand ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-serif font-bold text-foreground">{brand.headline}</h2>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">{brand.status === "published" ? "已发布" : "草稿"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{brand.intro}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/60">
                      <span>模板：{brand.templateCode}</span>
                      <span>语言：{brand.language}</span>
                      <span>{brand.viewCount} 次浏览</span>
                    </div>
                  </div>
                </div>
              ) : (
                <Empty icon={<Building2 className="w-10 h-10" />} title="尚未生成品牌页" text="升级至品牌套餐后，平台将为您生成专属品牌展示页。" />
              )
            )}

            {activeTab === "insights" && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "需求洞察报告",
                  "价格洞察报告",
                  "客户画像分析",
                  "中文沟通辅助",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">{item}</h2>
                      <p className="text-xs text-muted-foreground mt-1">当前演示账号可查看该权益样式。</p>
                    </div>
                  </div>
                ))}
                <Link href="/insights">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-sm font-semibold">
                    <BarChart3 className="w-4 h-4" />
                    浏览洞察报告
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <div className="mx-auto mb-3 opacity-30 flex justify-center">{icon}</div>
      <p className="text-sm">{title}</p>
      <p className="text-xs mt-1">{text}</p>
    </div>
  );
}
