import { countries, getSupplierById, serviceTypes } from "@/data/staticData";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";

export default function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();
  const supplier = getSupplierById(Number(id));
  const [showInquiry, setShowInquiry] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetCountry: "",
    serviceType: "",
    budget: "",
  });

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">服务商不存在</h2>
          <Link href="/suppliers">
            <button className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">返回服务商列表</button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!form.title.trim()) {
      toast.error("请填写需求标题");
      return;
    }
    toast.success("询价信息已在本地演示提交。静态托管版本不会写入服务器。");
    setShowInquiry(false);
    setForm({ title: "", description: "", targetCountry: "", serviceType: "", budget: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/60 bg-white/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container py-3">
          <Link href="/suppliers">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              返回服务商列表
            </button>
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-elegant">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary font-bold text-2xl font-serif">
                  {supplier.companyName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div>
                      <h1 className="text-2xl font-serif font-bold text-foreground">{supplier.companyName}</h1>
                      <p className="text-sm text-muted-foreground mt-0.5">{supplier.companyNameEn}</p>
                    </div>
                    {supplier.isSigned && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold badge-gold">
                        <Award className="w-4 h-4" />
                        金牌签约服务商
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Star
                          key={item}
                          className={`w-4 h-4 ${item <= Math.round(Number(supplier.rating)) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-foreground ml-1">{supplier.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{supplier.caseCount} 个成功案例</span>
                    <span className="text-sm text-muted-foreground">成立于 {supplier.foundedYear}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{supplier.description}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                服务范围
              </h2>
              <div className="flex flex-wrap gap-2">
                {supplier.serviceTypes.split(",").map((type) => (
                  <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/6 text-primary text-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                覆盖国家/地区
              </h2>
              <div className="flex flex-wrap gap-2">
                {supplier.coverageCountries.split(",").map((country) => (
                  <span key={country} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant sticky top-32">
              <h2 className="font-serif font-bold text-foreground mb-1">发起合作询价</h2>
              <p className="text-sm text-muted-foreground mb-5">静态版本会在浏览器内完成演示提交。</p>

              {!showInquiry ? (
                <button
                  onClick={() => setShowInquiry(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                  立即发起询价
                </button>
              ) : (
                <div className="space-y-4">
                  <input
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    placeholder="需求标题，例如：新加坡EP准证申请"
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
                  />
                  <select
                    value={form.targetCountry}
                    onChange={(event) => setForm({ ...form, targetCountry: event.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm"
                  >
                    <option value="">请选择目标国家</option>
                    {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                  </select>
                  <select
                    value={form.serviceType}
                    onChange={(event) => setForm({ ...form, serviceType: event.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm"
                  >
                    <option value="">请选择服务类型</option>
                    {serviceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <select
                    value={form.budget}
                    onChange={(event) => setForm({ ...form, budget: event.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm"
                  >
                    <option value="">请选择预算</option>
                    <option value="5,000元以内">5,000元以内</option>
                    <option value="5,000 - 20,000元">5,000 - 20,000元</option>
                    <option value="20,000 - 50,000元">20,000 - 50,000元</option>
                    <option value="面议">面议</option>
                  </select>
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    placeholder="补充说明您的需求"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm resize-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setShowInquiry(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 text-sm text-muted-foreground">
                      取消
                    </button>
                    <button onClick={handleSubmit} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                      <Send className="w-4 h-4" />
                      提交
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-border/60 space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">联系方式</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{supplier.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.contactPhone}</span>
                </div>
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Globe className="w-4 h-4" />
                  <span>访问官网</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-border/60 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>团队规模：{supplier.teamSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>成立于 {supplier.foundedYear} 年</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
