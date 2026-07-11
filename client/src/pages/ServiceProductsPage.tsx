import { countries, filterServiceProducts, serviceTypes } from "@/data/staticData";
import { ArrowRight, Award, CheckCircle2, Clock, Globe, PackageCheck, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useSearch } from "wouter";

export default function ServiceProductsPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const [country, setCountry] = useState(params.get("country") ?? "");
  const [serviceType, setServiceType] = useState(params.get("serviceType") ?? "");
  const products = filterServiceProducts(country || undefined, serviceType || undefined);
  const hasFilters = Boolean(country || serviceType);

  const clearFilters = () => {
    setCountry("");
    setServiceType("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container py-14">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <PackageCheck className="w-5 h-5 text-[oklch(0.82_0.12_75)]" />
              <span className="text-sm font-medium text-[oklch(0.75_0.02_240)]">服务产品</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">浏览可直接采购的合规服务包</h1>
            <p className="text-[oklch(0.7_0.02_240)] text-lg leading-relaxed">
              把原平台中的服务商品化展示为可筛选、可了解交付内容、可发起需求的前端演示页面。
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="bg-card border border-border/60 rounded-2xl p-5 mb-8 shadow-elegant">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">适用国家/地区</label>
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
            共找到 <span className="text-foreground font-semibold mx-1">{products.length}</span> 个服务产品
          </span>
          <Link href="/publish-request">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              发布需求 <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-5">
            {products.map((product) => (
              <article key={product.id} className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant card-hover">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary">
                        <PackageCheck className="w-3 h-3" />
                        {product.serviceType}
                      </span>
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-gold">
                          <Award className="w-3 h-3" />
                          推荐
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-1">{product.title}</h2>
                    <p className="text-xs text-muted-foreground">服务商：{product.supplierName}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-serif font-bold text-primary">{product.price}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {product.duration}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.summary}</p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{product.countries.split(",").join(" / ")}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {product.deliverables.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="rounded-xl bg-muted/60 p-4 mb-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">适合场景</p>
                  <p className="text-sm text-foreground">{product.suitableFor}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href={`/publish-request?serviceType=${encodeURIComponent(product.serviceType)}&country=${encodeURIComponent(product.countries.split(",")[0])}`}>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                      询问该服务 <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href={`/suppliers?serviceType=${encodeURIComponent(product.serviceType)}`}>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-sm font-semibold text-foreground">
                      查看相关服务商
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">暂无匹配服务产品</h2>
            <p className="text-muted-foreground mb-6">可以调整筛选条件，或直接发布需求由平台匹配。</p>
            <button onClick={clearFilters} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              查看全部
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
