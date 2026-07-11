import type { BrandProfile, InsightReport, ServiceProduct, ServiceRequest, Supplier } from "@/data/staticData";
import type { Language } from "./LanguageContext";

type Localized<T> = { zh: T; en: T };

export type LocalizedSupplier = Omit<Supplier, "companyName" | "description" | "serviceTypes" | "coverageCountries" | "teamSize"> & {
  companyName: Localized<string>;
  description: Localized<string>;
  serviceTypes: Localized<string>;
  coverageCountries: Localized<string>;
  teamSize: Localized<string>;
};

export type LocalizedServiceRequest = Omit<ServiceRequest, "supplierName" | "title" | "description" | "targetCountry" | "serviceType" | "budget" | "adminNote"> & {
  supplierName: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  targetCountry: Localized<string>;
  serviceType: Localized<string>;
  budget: Localized<string>;
  adminNote?: Localized<string>;
};

export type LocalizedServiceProduct = Omit<ServiceProduct, "title" | "supplierName" | "serviceType" | "countries" | "summary" | "deliverables" | "price" | "duration" | "suitableFor"> & {
  title: Localized<string>;
  supplierName: Localized<string>;
  serviceType: Localized<string>;
  countries: Localized<string>;
  summary: Localized<string>;
  deliverables: Localized<string[]>;
  price: Localized<string>;
  duration: Localized<string>;
  suitableFor: Localized<string>;
};

export type LocalizedBrandProfile = Omit<BrandProfile, "companyName" | "headline" | "intro" | "countries" | "services" | "language"> & {
  companyName: Localized<string>;
  headline: Localized<string>;
  intro: Localized<string>;
  countries: Localized<string>;
  services: Localized<string>;
  language: Localized<string>;
};

export type LocalizedInsightReport = Omit<InsightReport, "title" | "category" | "region" | "summary" | "metrics" | "highlights"> & {
  title: Localized<string>;
  category: Localized<string>;
  region: Localized<string>;
  summary: Localized<string>;
  metrics: Localized<Array<{ label: string; value: string; trend: string }>>;
  highlights: Localized<string[]>;
};

export const common = {
  zh: {
    allCountries: "全部国家/地区",
    allServiceTypes: "全部服务类型",
    clearFilters: "清除筛选",
    viewAll: "查看全部",
    noData: "暂无数据",
    budget: "预算",
    serviceProvider: "服务商",
    submit: "提交",
    cancel: "取消",
    backHome: "返回首页",
    staticDemo: "静态演示",
  },
  en: {
    allCountries: "All countries/regions",
    allServiceTypes: "All service types",
    clearFilters: "Clear filters",
    viewAll: "View all",
    noData: "No data",
    budget: "Budget",
    serviceProvider: "Provider",
    submit: "Submit",
    cancel: "Cancel",
    backHome: "Back home",
    staticDemo: "Static demo",
  },
};

export const countries = {
  zh: ["新加坡", "美国", "德国", "日本", "英国", "澳大利亚", "阿联酋", "印度", "越南", "法国", "印度尼西亚", "马来西亚", "荷兰", "加拿大", "韩国", "巴西"],
  en: ["Singapore", "United States", "Germany", "Japan", "United Kingdom", "Australia", "United Arab Emirates", "India", "Vietnam", "France", "Indonesia", "Malaysia", "Netherlands", "Canada", "South Korea", "Brazil"],
};

export const countryPairs = countries.zh.map((zh, index) => ({ zh, en: countries.en[index] }));

export const serviceTypes = {
  zh: ["劳动法咨询", "薪酬合规", "签证办理", "EOR服务", "公司注册", "税务合规", "GDPR合规", "社保缴纳", "劳动合同", "员工关系"],
  en: ["Labor law advisory", "Payroll compliance", "Visa processing", "EOR services", "Company registration", "Tax compliance", "GDPR compliance", "Social insurance", "Employment contracts", "Employee relations"],
};

export const serviceTypePairs = serviceTypes.zh.map((zh, index) => ({ zh, en: serviceTypes.en[index] }));

export const demandScenarios = {
  zh: ["海外雇佣", "员工派驻", "远程用工", "公司落地", "签证办理", "薪酬社保", "合同审阅", "合规诊断"],
  en: ["Overseas hiring", "Employee assignment", "Remote employment", "Market entry", "Visa processing", "Payroll and social insurance", "Contract review", "Compliance diagnosis"],
};

export const teamSizes = {
  zh: ["1-10人", "10-50人", "50-200人", "200-500人", "500人以上"],
  en: ["1-10 people", "10-50 people", "50-200 people", "200-500 people", "500+ people"],
};

export const budgets = {
  zh: ["5,000元以内", "5,000 - 20,000元", "20,000 - 50,000元", "50,000元以上", "面议"],
  en: ["Under CNY 5,000", "CNY 5,000 - 20,000", "CNY 20,000 - 50,000", "Above CNY 50,000", "To be discussed"],
};

export const statusText = {
  zh: {
    pending: "待处理",
    approved: "已通过",
    contacted: "已联系",
    in_progress: "进行中",
    completed: "已完成",
    published: "已发布",
    draft: "草稿",
    archived: "已归档",
    rejected: "已驳回",
  },
  en: {
    pending: "Pending",
    approved: "Approved",
    contacted: "Contacted",
    in_progress: "In progress",
    completed: "Completed",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
    rejected: "Rejected",
  },
};

export const suppliers: LocalizedSupplier[] = [
  {
    id: 1,
    companyName: { zh: "新加坡卓越人力资源集团", en: "SG Excellence HR Group" },
    companyNameEn: "SG Excellence HR Group",
    contactEmail: "contact@sg-excellence.example",
    contactPhone: "+65 6234 5678",
    website: "https://example.com",
    description: {
      zh: "专注新加坡、马来西亚和印度尼西亚的人力资源合规服务，提供工作准证、雇佣合同、薪酬社保和本地雇主服务。",
      en: "Focused on HR compliance across Singapore, Malaysia and Indonesia, covering work passes, employment contracts, payroll, social insurance and local employer support.",
    },
    serviceTypes: { zh: "劳动法咨询,签证办理,EOR服务,薪酬合规,劳动合同", en: "Labor law advisory,Visa processing,EOR services,Payroll compliance,Employment contracts" },
    coverageCountries: { zh: "新加坡,马来西亚,印度尼西亚", en: "Singapore,Malaysia,Indonesia" },
    isSigned: true,
    foundedYear: 2015,
    teamSize: { zh: "50-200人", en: "50-200 people" },
    caseCount: 268,
    rating: "4.9",
    status: "approved",
  },
  {
    id: 2,
    companyName: { zh: "欧美雇佣合规顾问", en: "EU-US Employment Advisory" },
    companyNameEn: "EU-US Employment Advisory",
    contactEmail: "hello@euus-advisory.example",
    contactPhone: "+1 415 555 0188",
    website: "https://example.com",
    description: {
      zh: "服务美国、德国、英国、法国等市场，擅长跨境用工政策、员工手册、本地薪资税务和远程雇佣风险评估。",
      en: "Serving the US, Germany, UK and France with cross-border employment policy, employee handbook, local payroll tax and remote employment risk advisory.",
    },
    serviceTypes: { zh: "劳动法咨询,薪酬合规,税务合规,GDPR合规,员工关系", en: "Labor law advisory,Payroll compliance,Tax compliance,GDPR compliance,Employee relations" },
    coverageCountries: { zh: "美国,德国,英国,法国,荷兰", en: "United States,Germany,United Kingdom,France,Netherlands" },
    isSigned: true,
    foundedYear: 2012,
    teamSize: { zh: "200-500人", en: "200-500 people" },
    caseCount: 431,
    rating: "4.8",
    status: "approved",
  },
  {
    id: 3,
    companyName: { zh: "东亚签证与用工中心", en: "East Asia Visa & Employment Center" },
    companyNameEn: "East Asia Visa & Employment Center",
    contactEmail: "service@eastasia-visa.example",
    contactPhone: "+81 3 5550 1212",
    website: "https://example.com",
    description: {
      zh: "覆盖日本、韩国及澳大利亚，提供工作签证、派遣安排、劳动合同审阅和当地入职流程支持。",
      en: "Covering Japan, South Korea and Australia with work visa, assignment arrangement, employment contract review and local onboarding support.",
    },
    serviceTypes: { zh: "签证办理,劳动合同,劳动法咨询,EOR服务", en: "Visa processing,Employment contracts,Labor law advisory,EOR services" },
    coverageCountries: { zh: "日本,韩国,澳大利亚", en: "Japan,South Korea,Australia" },
    isSigned: false,
    foundedYear: 2018,
    teamSize: { zh: "10-50人", en: "10-50 people" },
    caseCount: 156,
    rating: "4.6",
    status: "approved",
  },
  {
    id: 4,
    companyName: { zh: "中东企业落地服务", en: "Middle East Market Entry Services" },
    companyNameEn: "Middle East Market Entry Services",
    contactEmail: "bd@me-entry.example",
    contactPhone: "+971 4 555 0190",
    website: "https://example.com",
    description: {
      zh: "聚焦阿联酋和沙特市场，支持公司注册、自由区落地、雇佣许可、薪酬发放和员工合规管理。",
      en: "Focused on UAE and Saudi market entry, including company setup, free zone structuring, employment permits, payroll and employee compliance management.",
    },
    serviceTypes: { zh: "公司注册,签证办理,EOR服务,薪酬合规", en: "Company registration,Visa processing,EOR services,Payroll compliance" },
    coverageCountries: { zh: "阿联酋,沙特阿拉伯", en: "United Arab Emirates,Saudi Arabia" },
    isSigned: false,
    foundedYear: 2016,
    teamSize: { zh: "50-200人", en: "50-200 people" },
    caseCount: 198,
    rating: "4.7",
    status: "approved",
  },
  {
    id: 5,
    companyName: { zh: "拉美用工与薪税顾问", en: "LATAM Payroll Compliance" },
    companyNameEn: "LATAM Payroll Compliance",
    contactEmail: "consult@latam-payroll.example",
    contactPhone: "+55 11 5555 0101",
    website: "https://example.com",
    description: {
      zh: "为进入巴西、墨西哥等拉美市场的企业提供薪税、劳动合同、本地福利和员工关系咨询。",
      en: "Supporting companies entering Brazil, Mexico and broader LATAM markets with payroll tax, contracts, local benefits and employee relations.",
    },
    serviceTypes: { zh: "薪酬合规,税务合规,劳动合同,员工关系", en: "Payroll compliance,Tax compliance,Employment contracts,Employee relations" },
    coverageCountries: { zh: "巴西,墨西哥", en: "Brazil,Mexico" },
    isSigned: false,
    foundedYear: 2020,
    teamSize: { zh: "10-50人", en: "10-50 people" },
    caseCount: 89,
    rating: "4.5",
    status: "approved",
  },
];

export const serviceRequests: LocalizedServiceRequest[] = [
  {
    id: 101,
    supplierName: { zh: "新加坡卓越人力资源集团", en: "SG Excellence HR Group" },
    title: { zh: "新加坡EP准证申请评估", en: "Singapore EP work pass assessment" },
    description: { zh: "为拟派驻新加坡的销售负责人评估准证条件和办理周期。", en: "Assess work pass eligibility and processing timeline for a sales lead planned for Singapore assignment." },
    targetCountry: { zh: "新加坡", en: "Singapore" },
    serviceType: { zh: "签证办理", en: "Visa processing" },
    budget: { zh: "20,000 - 50,000元", en: "CNY 20,000 - 50,000" },
    status: "contacted",
    createdAt: "2026-05-20T08:00:00.000Z",
    adminNote: { zh: "已安排顾问联系，请准备候选人简历和薪资信息。", en: "Advisor has been assigned. Please prepare the candidate resume and compensation details." },
  },
  {
    id: 102,
    supplierName: { zh: "欧美雇佣合规顾问", en: "EU-US Employment Advisory" },
    title: { zh: "德国劳动合同模板审阅", en: "Germany employment contract template review" },
    description: { zh: "希望确认远程员工合同是否满足德国本地劳动法要求。", en: "Confirm whether a remote employee contract meets German local labor law requirements." },
    targetCountry: { zh: "德国", en: "Germany" },
    serviceType: { zh: "劳动合同", en: "Employment contracts" },
    budget: { zh: "5,000 - 20,000元", en: "CNY 5,000 - 20,000" },
    status: "pending",
    createdAt: "2026-05-28T08:00:00.000Z",
  },
  {
    id: 103,
    supplierName: { zh: "东亚签证与用工中心", en: "East Asia Visa & Employment Center" },
    title: { zh: "日本工程师工作签证路径确认", en: "Japan engineer work visa pathway confirmation" },
    description: { zh: "计划派驻 3 名研发工程师到东京，希望确认签证类型、材料清单和预计办理周期。", en: "Plan to assign three R&D engineers to Tokyo and confirm visa type, document list and expected timeline." },
    targetCountry: { zh: "日本", en: "Japan" },
    serviceType: { zh: "签证办理", en: "Visa processing" },
    budget: { zh: "20,000 - 50,000元", en: "CNY 20,000 - 50,000" },
    status: "in_progress",
    createdAt: "2026-06-02T08:00:00.000Z",
    adminNote: { zh: "已进入材料准备阶段，等待候选人学历和工作经历文件。", en: "Document preparation has started. Waiting for candidate education and work history files." },
  },
  {
    id: 104,
    supplierName: { zh: "中东企业落地服务", en: "Middle East Market Entry Services" },
    title: { zh: "阿联酋自由区公司注册咨询", en: "UAE free zone company setup advisory" },
    description: { zh: "需要比较不同自由区的注册成本、签证配额、办公地址要求和银行开户准备。", en: "Compare setup costs, visa quota, office address requirements and bank account preparation across free zones." },
    targetCountry: { zh: "阿联酋", en: "United Arab Emirates" },
    serviceType: { zh: "公司注册", en: "Company registration" },
    budget: { zh: "面议", en: "To be discussed" },
    status: "completed",
    createdAt: "2026-06-08T08:00:00.000Z",
    adminNote: { zh: "已完成方案建议，客户准备进入注册执行阶段。", en: "Recommendation has been delivered. Client is preparing to move into setup execution." },
  },
];

export const serviceProducts: LocalizedServiceProduct[] = [
  {
    id: 1,
    title: { zh: "新加坡 EP 准证申请评估包", en: "Singapore EP application assessment package" },
    supplierName: { zh: "新加坡卓越人力资源集团", en: "SG Excellence HR Group" },
    serviceType: { zh: "签证办理", en: "Visa processing" },
    countries: { zh: "新加坡", en: "Singapore" },
    summary: { zh: "面向计划派驻管理层或专业人才的新加坡 EP 准证预评估和材料清单服务。", en: "Pre-assessment and document checklist for companies assigning managers or professionals to Singapore under EP." },
    deliverables: { zh: ["候选人条件预评估", "公司资质检查清单", "申请材料清单", "办理周期和风险提示"], en: ["Candidate eligibility assessment", "Company qualification checklist", "Application document list", "Timeline and risk notes"] },
    price: { zh: "¥8,000 起", en: "From CNY 8,000" },
    duration: { zh: "3-5 个工作日", en: "3-5 business days" },
    suitableFor: { zh: "首次派驻员工到新加坡的企业", en: "Companies assigning employees to Singapore for the first time" },
    featured: true,
  },
  {
    id: 2,
    title: { zh: "欧美远程员工合规诊断", en: "EU-US remote employee compliance diagnosis" },
    supplierName: { zh: "欧美雇佣合规顾问", en: "EU-US Employment Advisory" },
    serviceType: { zh: "劳动法咨询", en: "Labor law advisory" },
    countries: { zh: "美国,德国,英国,法国,荷兰", en: "United States,Germany,United Kingdom,France,Netherlands" },
    summary: { zh: "梳理远程员工身份、合同、薪资税务、工时休假和解雇风险。", en: "Review remote worker status, contracts, payroll tax, working hours, leave and termination risk." },
    deliverables: { zh: ["用工模式诊断", "核心风险清单", "合同条款建议", "下一步整改路线"], en: ["Employment model diagnosis", "Core risk list", "Contract clause suggestions", "Next-step remediation roadmap"] },
    price: { zh: "¥12,000 起", en: "From CNY 12,000" },
    duration: { zh: "5-7 个工作日", en: "5-7 business days" },
    suitableFor: { zh: "已有海外远程员工或准备跨国招聘的团队", en: "Teams with overseas remote employees or preparing cross-border hiring" },
    featured: true,
  },
  {
    id: 3,
    title: { zh: "日本外籍员工入职手续包", en: "Japan foreign employee onboarding package" },
    supplierName: { zh: "东亚签证与用工中心", en: "East Asia Visa & Employment Center" },
    serviceType: { zh: "签证办理", en: "Visa processing" },
    countries: { zh: "日本", en: "Japan" },
    summary: { zh: "覆盖签证匹配、入职材料、劳动合同和社保登记提醒。", en: "Covering visa matching, onboarding documents, employment contract and social insurance reminders." },
    deliverables: { zh: ["签证路径建议", "入职材料列表", "合同审阅要点", "社保登记流程说明"], en: ["Visa pathway recommendation", "Onboarding document list", "Contract review points", "Social insurance process notes"] },
    price: { zh: "¥9,800 起", en: "From CNY 9,800" },
    duration: { zh: "5 个工作日", en: "5 business days" },
    suitableFor: { zh: "准备在日本雇佣外籍员工的企业", en: "Companies preparing to hire foreign employees in Japan" },
    featured: false,
  },
  {
    id: 4,
    title: { zh: "阿联酋自由区落地方案", en: "UAE free zone market entry plan" },
    supplierName: { zh: "中东企业落地服务", en: "Middle East Market Entry Services" },
    serviceType: { zh: "公司注册", en: "Company registration" },
    countries: { zh: "阿联酋", en: "United Arab Emirates" },
    summary: { zh: "帮助企业比较自由区、注册路径、签证配额和当地运营要求。", en: "Compare free zones, setup paths, visa quota and local operating requirements." },
    deliverables: { zh: ["自由区对比", "注册材料清单", "预算测算", "签证配额建议"], en: ["Free zone comparison", "Registration document checklist", "Budget estimate", "Visa quota recommendation"] },
    price: { zh: "¥18,000 起", en: "From CNY 18,000" },
    duration: { zh: "7-10 个工作日", en: "7-10 business days" },
    suitableFor: { zh: "准备在中东设立销售、服务或控股主体的企业", en: "Companies setting up sales, service or holding entities in the Middle East" },
    featured: true,
  },
  {
    id: 5,
    title: { zh: "拉美薪税合规月度顾问", en: "LATAM payroll tax monthly advisory" },
    supplierName: { zh: "拉美用工与薪税顾问", en: "LATAM Payroll Compliance" },
    serviceType: { zh: "薪酬合规", en: "Payroll compliance" },
    countries: { zh: "巴西,墨西哥", en: "Brazil,Mexico" },
    summary: { zh: "提供当地薪资税务、福利缴纳、劳动合同和员工关系月度咨询。", en: "Monthly advisory for local payroll tax, benefits, employment contracts and employee relations." },
    deliverables: { zh: ["月度薪税咨询", "福利缴纳提醒", "合同问题答疑", "政策更新摘要"], en: ["Monthly payroll tax advisory", "Benefit contribution reminders", "Contract Q&A", "Policy update summary"] },
    price: { zh: "¥6,000/月 起", en: "From CNY 6,000/month" },
    duration: { zh: "按月服务", en: "Monthly service" },
    suitableFor: { zh: "已有拉美员工且需要持续合规支持的企业", en: "Companies with LATAM employees requiring ongoing compliance support" },
    featured: false,
  },
];

export const brandProfiles: LocalizedBrandProfile[] = [
  {
    id: 1,
    supplierId: 1,
    companyName: { zh: "新加坡卓越人力资源集团", en: "SG Excellence HR Group" },
    headline: { zh: "东南亚雇佣与准证落地专家", en: "Southeast Asia employment and work pass specialist" },
    intro: { zh: "面向中国出海企业提供新加坡、马来西亚和印度尼西亚的工作准证、雇佣合同、薪酬社保和本地雇主服务。", en: "Providing work pass, employment contract, payroll, social insurance and local employer services across Singapore, Malaysia and Indonesia." },
    countries: { zh: "新加坡,马来西亚,印度尼西亚", en: "Singapore,Malaysia,Indonesia" },
    services: { zh: "签证办理,EOR服务,薪酬合规,劳动合同", en: "Visa processing,EOR services,Payroll compliance,Employment contracts" },
    templateCode: "premium-asia",
    language: { zh: "中英双语", en: "Chinese and English" },
    viewCount: 1286,
    status: "published",
  },
  {
    id: 2,
    supplierId: 2,
    companyName: { zh: "欧美雇佣合规顾问", en: "EU-US Employment Advisory" },
    headline: { zh: "欧美远程用工风险诊断与整改顾问", en: "EU-US remote employment risk diagnosis and remediation" },
    intro: { zh: "帮助企业处理欧美远程员工合同、薪资税务、员工分类、GDPR 和解雇流程风险。", en: "Helping companies manage remote employee contracts, payroll tax, worker classification, GDPR and termination process risk." },
    countries: { zh: "美国,德国,英国,法国,荷兰", en: "United States,Germany,United Kingdom,France,Netherlands" },
    services: { zh: "劳动法咨询,税务合规,GDPR合规,员工关系", en: "Labor law advisory,Tax compliance,GDPR compliance,Employee relations" },
    templateCode: "trust-advisory",
    language: { zh: "中文", en: "Chinese" },
    viewCount: 964,
    status: "published",
  },
  {
    id: 3,
    supplierId: 4,
    companyName: { zh: "中东企业落地服务", en: "Middle East Market Entry Services" },
    headline: { zh: "阿联酋自由区注册与雇佣许可服务", en: "UAE free zone setup and employment permit services" },
    intro: { zh: "为进入中东市场的企业提供自由区选择、公司注册、签证配额、雇佣许可和银行开户准备服务。", en: "Supporting companies entering the Middle East with free zone selection, company setup, visa quota, employment permits and bank account preparation." },
    countries: { zh: "阿联酋,沙特阿拉伯", en: "United Arab Emirates,Saudi Arabia" },
    services: { zh: "公司注册,签证办理,EOR服务,薪酬合规", en: "Company registration,Visa processing,EOR services,Payroll compliance" },
    templateCode: "market-entry",
    language: { zh: "中英双语", en: "Chinese and English" },
    viewCount: 732,
    status: "draft",
  },
];

export const insightReports: LocalizedInsightReport[] = [
  {
    id: 1,
    title: { zh: "2026 东南亚用工需求趋势", en: "2026 Southeast Asia employment demand trends" },
    category: { zh: "需求洞察", en: "Demand insight" },
    region: { zh: "东南亚", en: "Southeast Asia" },
    summary: { zh: "中国企业在新加坡、马来西亚和印尼的合规需求集中在工作准证、EOR、薪酬社保和本地合同。", en: "Chinese companies' compliance needs in Singapore, Malaysia and Indonesia focus on work passes, EOR, payroll, social insurance and local contracts." },
    metrics: { zh: [{ label: "需求增长", value: "38%", trend: "较上季度提升" }, { label: "热门服务", value: "签证办理", trend: "询价占比最高" }, { label: "平均预算", value: "¥32,000", trend: "中位区间" }], en: [{ label: "Demand growth", value: "38%", trend: "Up from last quarter" }, { label: "Top service", value: "Visa processing", trend: "Highest inquiry share" }, { label: "Average budget", value: "CNY 32,000", trend: "Median range" }] },
    highlights: { zh: ["新加坡仍是区域总部首选", "EOR 适合早期试水团队", "印尼和马来西亚对本地合同要求更细"], en: ["Singapore remains the preferred regional HQ", "EOR fits early market testing teams", "Indonesia and Malaysia require more detailed local contracts"] },
    publishedAt: "2026-06-12",
  },
  {
    id: 2,
    title: { zh: "欧美远程员工合规风险图谱", en: "EU-US remote employee compliance risk map" },
    category: { zh: "风险洞察", en: "Risk insight" },
    region: { zh: "欧美", en: "EU-US" },
    summary: { zh: "欧美市场的主要风险来自员工分类、当地薪资税务、解雇通知期和隐私数据处理。", en: "Main risks in EU-US markets include worker classification, local payroll tax, termination notice and privacy data handling." },
    metrics: { zh: [{ label: "高频风险", value: "员工分类", trend: "咨询量最高" }, { label: "重点国家", value: "美国/德国", trend: "复杂度较高" }, { label: "整改周期", value: "2-4周", trend: "常见项目周期" }], en: [{ label: "Frequent risk", value: "Worker classification", trend: "Highest inquiry volume" }, { label: "Key markets", value: "US/Germany", trend: "Higher complexity" }, { label: "Remediation", value: "2-4 weeks", trend: "Common project cycle" }] },
    highlights: { zh: ["美国州法差异明显", "德国劳动保护规则严格", "GDPR 会影响人事数据处理"], en: ["US state law differences are significant", "German labor protections are strict", "GDPR affects HR data handling"] },
    publishedAt: "2026-06-15",
  },
  {
    id: 3,
    title: { zh: "中东公司落地服务价格观察", en: "Middle East company setup service pricing watch" },
    category: { zh: "价格洞察", en: "Pricing insight" },
    region: { zh: "中东", en: "Middle East" },
    summary: { zh: "阿联酋自由区服务报价受自由区类型、签证配额、办公地址和银行开户难度影响。", en: "UAE free zone service pricing is affected by free zone type, visa quota, office address and bank account difficulty." },
    metrics: { zh: [{ label: "起步报价", value: "¥18,000", trend: "注册咨询服务" }, { label: "高频需求", value: "自由区比较", trend: "企业决策前置" }, { label: "交付周期", value: "7-20天", trend: "视材料而定" }], en: [{ label: "Starting price", value: "CNY 18,000", trend: "Registration advisory" }, { label: "Common need", value: "Free zone comparison", trend: "Pre-decision support" }, { label: "Timeline", value: "7-20 days", trend: "Depends on documents" }] },
    highlights: { zh: ["自由区选择影响后续经营范围", "签证配额需要提前规划", "银行开户材料准备越来越重要"], en: ["Free zone choice affects business scope", "Visa quota requires early planning", "Bank document preparation is increasingly important"] },
    publishedAt: "2026-06-18",
  },
];

export const platformStats = {
  supplierCount: suppliers.length,
  requestCount: 520,
  completedCount: 386,
  countryCount: 30,
};

export function text(language: Language, value: Localized<string>) {
  return value[language];
}

export function list(language: Language, value: Localized<string[]>) {
  return value[language];
}

export function splitText(language: Language, value: Localized<string>) {
  return value[language].split(",");
}

export function findCountryByAny(value: string) {
  return countryPairs.find((country) => country.zh === value || country.en === value);
}

export function findServiceTypeByAny(value: string) {
  return serviceTypePairs.find((serviceType) => serviceType.zh === value || serviceType.en === value);
}

export function filterSuppliers(language: Language, country?: string, serviceType?: string) {
  const countryPair = country ? findCountryByAny(country) : undefined;
  const serviceTypePair = serviceType ? findServiceTypeByAny(serviceType) : undefined;
  return suppliers
    .filter((item) => item.status === "approved")
    .filter((item) => !countryPair || item.coverageCountries.zh.includes(countryPair.zh) || item.coverageCountries.en.includes(countryPair.en))
    .filter((item) => !serviceTypePair || item.serviceTypes.zh.includes(serviceTypePair.zh) || item.serviceTypes.en.includes(serviceTypePair.en))
    .sort((a, b) => Number(b.isSigned) - Number(a.isSigned) || Number(b.rating) - Number(a.rating))
    .map((item) => ({ ...item, displayName: item.companyName[language] }));
}

export function filterServiceProducts(language: Language, country?: string, serviceType?: string) {
  const countryPair = country ? findCountryByAny(country) : undefined;
  const serviceTypePair = serviceType ? findServiceTypeByAny(serviceType) : undefined;
  return serviceProducts
    .filter((item) => !countryPair || item.countries.zh.includes(countryPair.zh) || item.countries.en.includes(countryPair.en))
    .filter((item) => !serviceTypePair || item.serviceType.zh === serviceTypePair.zh || item.serviceType.en === serviceTypePair.en)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map((item) => ({ ...item, displayTitle: item.title[language] }));
}

export function getSupplierById(id: number) {
  return suppliers.find((item) => item.id === id);
}

export function getInsightReportById(id: number) {
  return insightReports.find((item) => item.id === id);
}
