import { countries, filterSuppliers, serviceTypes } from "@/data/staticData";
import { Award, Briefcase, Building2, ChevronRight, Globe, MapPin, Search, Star, X } from "lucide-react";
import { useState } from "react";
import { Link, useSearch } from "wouter";

export default function SuppliersPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const [country, setCountry] = useState(params.get("country") ?? "");
  const [serviceType, setServiceType] = useState(params.get("serviceType") ?? "");
  const suppliers = filterSuppliers(country || undefined, serviceType || undefined);
  const hasFilters = Boolean(country || serviceType);

  const clearFilters = () => {
    setCountry("");
    setServiceType("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[oklch(0.18_0.04_240)] text-white py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[oklch(0.82_0.12_75)]" />
              <span className="text-sm font-medium text-[oklch(0.75_0.02_240)]">全球合规服务商</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">找到适合的服务商</h1>
            <p className="text-[oklch(0.7_0.02_240)] text-lg leading-relaxed">
              当前为静态演示数据，可直接托管。后续如需真实数据，可以接入腾讯云函数或云开发数据库。
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="bg-card border border-border/60 rounded-2xl p-5 mb-8 shadow-elegant">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">目标国家/地区</label>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">全部国家/地区</option>
                {countries.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">服务类型</label>
              <select
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">全部服务类型</option>
                {serviceTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60"
                >
                  <X className="w-4 h-4" />
                  清除筛选
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            共找到 <span className="text-foreground font-semibold mx-1">{suppliers.length}</span> 家服务商
          </span>
          {suppliers.some((item) => item.isSigned) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium badge-gold">
              <Award className="w-3 h-3" />
              金牌优先
            </span>
          )}
        </div>

        {suppliers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {suppliers.map((supplier) => (
              <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
                <div className="group bg-card rounded-2xl border border-border/60 p-6 card-hover cursor-pointer shadow-elegant h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold text-xl font-serif">
                      {supplier.companyName.charAt(0)}
                    </div>
                    {supplier.isSigned ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-gold">
                        <Award className="w-3 h-3" />
                        金牌服务商
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        认证服务商
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-0.5 group-hover:text-primary line-clamp-1">{supplier.companyName}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{supplier.companyNameEn}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">{supplier.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {supplier.serviceTypes.split(",").slice(0, 3).map((type) => (
                      <span key={type} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">{type}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{supplier.coverageCountries.split(",").slice(0, 3).join(" / ")}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold">{supplier.rating}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">{supplier.caseCount} 案例</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      查看详情 <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Building2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">暂无匹配服务商</h3>
            <p className="text-muted-foreground mb-6">可以调整筛选条件，或提交新的服务商入驻信息。</p>
            <button onClick={clearFilters} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              <Search className="w-4 h-4" />
              查看全部
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
