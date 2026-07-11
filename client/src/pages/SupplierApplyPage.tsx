import { countries, serviceTypes } from "@/data/staticData";
import { Award, Building2, CheckCircle2, Globe, Mail, Phone, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const teamSizes = ["1-10人", "10-50人", "50-200人", "200-500人", "500人以上"];

const benefits = [
  { icon: <TrendingUp className="w-5 h-5" />, title: "精准客户资源", desc: "展示给有真实出海合规需求的企业用户。" },
  { icon: <Award className="w-5 h-5" />, title: "金牌优先推荐", desc: "签约服务商可以在目录中获得更醒目的展示。" },
  { icon: <Shield className="w-5 h-5" />, title: "平台信用背书", desc: "通过平台认证后提升客户初步信任。" },
  { icon: <Globe className="w-5 h-5" />, title: "全球服务网络", desc: "按国家和服务类型组织，方便客户筛选。" },
];

export default function SupplierApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [form, setForm] = useState({
    companyName: "",
    companyNameEn: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
    foundedYear: "",
    teamSize: "",
  });

  const toggle = (value: string, list: string[], setList: (value: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const handleSubmit = () => {
    if (!form.companyName || !form.contactName || !form.contactEmail || !form.description) {
      toast.error("请填写公司名称、联系人、邮箱和公司介绍");
      return;
    }
    if (selectedServices.length === 0 || selectedCountries.length === 0) {
      toast.error("请至少选择一种服务类型和一个覆盖国家");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">申请已提交</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            这是静态托管版本的演示提交，信息不会写入服务器。正式上线时可以把这里接入腾讯云函数、表单收集或云数据库。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/suppliers">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">浏览服务商</button>
            </Link>
            <Link href="/">
              <button className="px-6 py-3 rounded-xl border border-border/60 text-foreground font-semibold text-sm">返回首页</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[oklch(0.18_0.04_240)] text-white py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[oklch(0.82_0.12_75)]" />
              <span className="text-sm font-medium text-[oklch(0.75_0.02_240)]">服务商入驻</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">加入出海合规服务平台</h1>
            <p className="text-[oklch(0.7_0.02_240)] text-lg leading-relaxed">填写资料后即可看到提交效果，适合静态网站演示和业务验证。</p>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground mb-5">入驻平台的优势</h2>
              <div className="space-y-5">
                {benefits.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-elegant">
              <h2 className="font-serif font-bold text-foreground text-xl mb-6">填写入驻申请</h2>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="公司名称" required value={form.companyName} onChange={(value) => setForm({ ...form, companyName: value })} />
                  <Field label="英文名称" value={form.companyNameEn} onChange={(value) => setForm({ ...form, companyNameEn: value })} />
                  <Field label="联系人" required value={form.contactName} onChange={(value) => setForm({ ...form, contactName: value })} icon={<Mail className="w-4 h-4" />} />
                  <Field label="联系邮箱" required type="email" value={form.contactEmail} onChange={(value) => setForm({ ...form, contactEmail: value })} />
                  <Field label="联系电话" value={form.contactPhone} onChange={(value) => setForm({ ...form, contactPhone: value })} icon={<Phone className="w-4 h-4" />} />
                  <Field label="成立年份" type="number" value={form.foundedYear} onChange={(value) => setForm({ ...form, foundedYear: value })} />
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">团队规模</label>
                    <select value={form.teamSize} onChange={(event) => setForm({ ...form, teamSize: event.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm">
                      <option value="">请选择</option>
                      {teamSizes.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <Field label="官网地址" type="url" value={form.website} onChange={(value) => setForm({ ...form, website: value })} />
                </div>

                <ChoiceGroup title="服务类型" required items={serviceTypes} selected={selectedServices} onToggle={(item) => toggle(item, selectedServices, setSelectedServices)} />
                <ChoiceGroup title="覆盖国家/地区" required items={countries} selected={selectedCountries} onToggle={(item) => toggle(item, selectedCountries, setSelectedCountries)} />

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">公司介绍<span className="text-destructive ml-0.5">*</span></label>
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    placeholder="请介绍服务能力、专业优势和典型经验"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">{form.description.length} 字</p>
                </div>

                <button onClick={handleSubmit} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90">
                  <Building2 className="w-5 h-5" />
                  提交入驻申请
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
      />
    </div>
  );
}

function ChoiceGroup({ title, items, selected, onToggle, required }: { title: string; items: string[]; selected: string[]; onToggle: (value: string) => void; required?: boolean }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pb-2 border-b border-border/60">
        {title}{required && <span className="text-destructive ml-0.5">*</span>}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              selected.includes(item) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {selected.length > 0 && <p className="text-xs text-muted-foreground mt-2">已选择 {selected.length} 项</p>}
    </div>
  );
}
