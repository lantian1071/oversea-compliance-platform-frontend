import { countries, demandScenarios, serviceTypes } from "@/data/staticData";
import { CheckCircle2, ClipboardList, FileText, MapPin, Send, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useSearch } from "wouter";
import { toast } from "sonner";

const budgets = ["5,000元以内", "5,000 - 20,000元", "20,000 - 50,000元", "50,000元以上", "面议"];

export default function PublishRequestPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    scenario: "",
    targetCountry: params.get("country") ?? "",
    serviceType: params.get("serviceType") ?? "",
    budget: "",
    contactName: "",
    contactEmail: "",
    description: "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.title || !form.targetCountry || !form.serviceType || !form.contactName || !form.contactEmail || !form.description) {
      toast.error("请填写需求标题、国家、服务类型、联系人、邮箱和需求说明");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-3">需求已发布</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            这是纯前端演示提交，系统会展示发布成功状态。正式版可接入登录、数据库和服务商匹配流程。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/my-requests">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">查看我的需求</button>
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-xl border border-border/60 text-foreground font-semibold text-sm"
            >
              再发布一条
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[oklch(0.18_0.04_240)] text-white">
        <div className="container py-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-5 h-5 text-[oklch(0.82_0.12_75)]" />
              <span className="text-sm font-medium text-[oklch(0.75_0.02_240)]">发布需求</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">描述出海合规需求，匹配合适服务商</h1>
            <p className="text-[oklch(0.7_0.02_240)] text-lg leading-relaxed">
              用表单演示企业提交需求、平台整理线索、服务商跟进的核心流程。
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <aside className="space-y-4">
            {[
              { icon: <FileText className="w-5 h-5" />, title: "填写背景", text: "说明目标国家、员工规模、业务场景和时间要求。" },
              { icon: <MapPin className="w-5 h-5" />, title: "平台匹配", text: "演示版展示提交结果，正式版可匹配服务商。" },
              { icon: <Wallet className="w-5 h-5" />, title: "预算沟通", text: "预算用于服务商判断方案复杂度和报价范围。" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border border-border/60 p-5 shadow-elegant">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-3">{item.icon}</div>
                <h2 className="font-serif font-bold text-foreground mb-1">{item.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </aside>

          <section className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-6 lg:p-8 shadow-elegant">
            <h2 className="text-xl font-serif font-bold text-foreground mb-6">需求信息</h2>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="需求标题" required value={form.title} onChange={(value) => update("title", value)} placeholder="例如：德国远程员工合规咨询" />
                <Select label="业务场景" value={form.scenario} onChange={(value) => update("scenario", value)} options={demandScenarios} placeholder="请选择场景" />
                <Select label="目标国家/地区" required value={form.targetCountry} onChange={(value) => update("targetCountry", value)} options={countries} placeholder="请选择国家/地区" />
                <Select label="服务类型" required value={form.serviceType} onChange={(value) => update("serviceType", value)} options={serviceTypes} placeholder="请选择服务类型" />
                <Select label="预算范围" value={form.budget} onChange={(value) => update("budget", value)} options={budgets} placeholder="请选择预算" />
                <Field label="联系人" required value={form.contactName} onChange={(value) => update("contactName", value)} placeholder="您的姓名" />
                <Field label="联系邮箱" required type="email" value={form.contactEmail} onChange={(value) => update("contactEmail", value)} placeholder="name@company.com" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  需求说明<span className="text-destructive ml-0.5">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(event) => update("description", event.target.value)}
                  rows={6}
                  placeholder="请说明员工人数、目标国家、期望服务、时间安排和当前遇到的问题"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-sm resize-none focus:outline-none focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-1.5">{form.description.length} 字</p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
              >
                <Send className="w-5 h-5" />
                发布需求
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:border-primary/50"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
