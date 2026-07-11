export type Supplier = {
  id: number;
  companyName: string;
  companyNameEn: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  serviceTypes: string;
  coverageCountries: string;
  isSigned: boolean;
  foundedYear: number;
  teamSize: string;
  caseCount: number;
  rating: string;
  status: "approved" | "pending";
};

export type ServiceRequest = {
  id: number;
  supplierName: string;
  title: string;
  description: string;
  targetCountry: string;
  serviceType: string;
  budget: string;
  status: "pending" | "contacted" | "in_progress" | "completed";
  createdAt: string;
  adminNote?: string;
};

export type ServiceProduct = {
  id: number;
  title: string;
  supplierName: string;
  serviceType: string;
  countries: string;
  summary: string;
  deliverables: string[];
  price: string;
  duration: string;
  suitableFor: string;
  featured: boolean;
};

export type InsightReport = {
  id: number;
  title: string;
  category: string;
  region: string;
  summary: string;
  metrics: Array<{ label: string; value: string; trend: string }>;
  highlights: string[];
  publishedAt: string;
};

export type BrandProfile = {
  id: number;
  supplierId: number;
  companyName: string;
  headline: string;
  intro: string;
  countries: string;
  services: string;
  templateCode: string;
  language: string;
  viewCount: number;
  status: "published" | "draft" | "archived";
};

export const countries = [
  "新加坡",
  "美国",
  "德国",
  "日本",
  "英国",
  "澳大利亚",
  "阿联酋",
  "印度",
  "越南",
  "法国",
  "印度尼西亚",
  "马来西亚",
  "荷兰",
  "加拿大",
  "韩国",
  "巴西",
];

export const serviceTypes = [
  "劳动法咨询",
  "薪酬合规",
  "签证办理",
  "EOR服务",
  "公司注册",
  "税务合规",
  "GDPR合规",
  "社保缴纳",
  "劳动合同",
  "员工关系",
];

export const demandScenarios = [
  "海外雇佣",
  "员工派驻",
  "远程用工",
  "公司落地",
  "签证办理",
  "薪酬社保",
  "合同审阅",
  "合规诊断",
];

export const suppliers: Supplier[] = [
  {
    id: 1,
    companyName: "新加坡卓越人力资源集团",
    companyNameEn: "SG Excellence HR Group",
    contactEmail: "contact@sg-excellence.example",
    contactPhone: "+65 6234 5678",
    website: "https://example.com",
    description:
      "专注新加坡、马来西亚和印度尼西亚的人力资源合规服务，提供工作准证、雇佣合同、薪酬社保和本地雇主服务。",
    serviceTypes: "劳动法咨询,签证办理,EOR服务,薪酬合规,劳动合同",
    coverageCountries: "新加坡,马来西亚,印度尼西亚",
    isSigned: true,
    foundedYear: 2015,
    teamSize: "50-200人",
    caseCount: 268,
    rating: "4.9",
    status: "approved",
  },
  {
    id: 2,
    companyName: "欧美雇佣合规顾问",
    companyNameEn: "EU-US Employment Advisory",
    contactEmail: "hello@euus-advisory.example",
    contactPhone: "+1 415 555 0188",
    website: "https://example.com",
    description:
      "服务美国、德国、英国、法国等市场，擅长跨境用工政策、员工手册、本地薪资税务和远程雇佣风险评估。",
    serviceTypes: "劳动法咨询,薪酬合规,税务合规,GDPR合规,员工关系",
    coverageCountries: "美国,德国,英国,法国,荷兰",
    isSigned: true,
    foundedYear: 2012,
    teamSize: "200-500人",
    caseCount: 431,
    rating: "4.8",
    status: "approved",
  },
  {
    id: 3,
    companyName: "东亚签证与用工中心",
    companyNameEn: "East Asia Visa & Employment Center",
    contactEmail: "service@eastasia-visa.example",
    contactPhone: "+81 3 5550 1212",
    website: "https://example.com",
    description:
      "覆盖日本、韩国及澳大利亚，提供工作签证、派遣安排、劳动合同审阅和当地入职流程支持。",
    serviceTypes: "签证办理,劳动合同,劳动法咨询,EOR服务",
    coverageCountries: "日本,韩国,澳大利亚",
    isSigned: false,
    foundedYear: 2018,
    teamSize: "10-50人",
    caseCount: 156,
    rating: "4.6",
    status: "approved",
  },
  {
    id: 4,
    companyName: "中东企业落地服务",
    companyNameEn: "Middle East Market Entry Services",
    contactEmail: "bd@me-entry.example",
    contactPhone: "+971 4 555 0190",
    website: "https://example.com",
    description:
      "聚焦阿联酋和沙特市场，支持公司注册、自由区落地、雇佣许可、薪酬发放和员工合规管理。",
    serviceTypes: "公司注册,签证办理,EOR服务,薪酬合规",
    coverageCountries: "阿联酋,沙特阿拉伯",
    isSigned: false,
    foundedYear: 2016,
    teamSize: "50-200人",
    caseCount: 198,
    rating: "4.7",
    status: "approved",
  },
  {
    id: 5,
    companyName: "拉美用工与薪税顾问",
    companyNameEn: "LATAM Payroll Compliance",
    contactEmail: "consult@latam-payroll.example",
    contactPhone: "+55 11 5555 0101",
    website: "https://example.com",
    description:
      "为进入巴西、墨西哥等拉美市场的企业提供薪税、劳动合同、本地福利和员工关系咨询。",
    serviceTypes: "薪酬合规,税务合规,劳动合同,员工关系",
    coverageCountries: "巴西,墨西哥",
    isSigned: false,
    foundedYear: 2020,
    teamSize: "10-50人",
    caseCount: 89,
    rating: "4.5",
    status: "approved",
  },
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: 101,
    supplierName: "新加坡卓越人力资源集团",
    title: "新加坡EP准证申请评估",
    description: "为拟派驻新加坡的销售负责人评估准证条件和办理周期。",
    targetCountry: "新加坡",
    serviceType: "签证办理",
    budget: "20,000 - 50,000元",
    status: "contacted",
    createdAt: "2026-05-20T08:00:00.000Z",
    adminNote: "已安排顾问联系，请准备候选人简历和薪资信息。",
  },
  {
    id: 102,
    supplierName: "欧美雇佣合规顾问",
    title: "德国劳动合同模板审阅",
    description: "希望确认远程员工合同是否满足德国本地劳动法要求。",
    targetCountry: "德国",
    serviceType: "劳动合同",
    budget: "5,000 - 20,000元",
    status: "pending",
    createdAt: "2026-05-28T08:00:00.000Z",
  },
  {
    id: 103,
    supplierName: "东亚签证与用工中心",
    title: "日本工程师工作签证路径确认",
    description: "计划派驻 3 名研发工程师到东京，希望确认签证类型、材料清单和预计办理周期。",
    targetCountry: "日本",
    serviceType: "签证办理",
    budget: "20,000 - 50,000元",
    status: "in_progress",
    createdAt: "2026-06-02T08:00:00.000Z",
    adminNote: "已进入材料准备阶段，等待候选人学历和工作经历文件。",
  },
  {
    id: 104,
    supplierName: "中东企业落地服务",
    title: "阿联酋自由区公司注册咨询",
    description: "需要比较不同自由区的注册成本、签证配额、办公地址要求和银行开户准备。",
    targetCountry: "阿联酋",
    serviceType: "公司注册",
    budget: "面议",
    status: "completed",
    createdAt: "2026-06-08T08:00:00.000Z",
    adminNote: "已完成方案建议，客户准备进入注册执行阶段。",
  },
];

export const serviceProducts: ServiceProduct[] = [
  {
    id: 1,
    title: "新加坡 EP 准证申请评估包",
    supplierName: "新加坡卓越人力资源集团",
    serviceType: "签证办理",
    countries: "新加坡",
    summary: "面向计划派驻管理层或专业人才的新加坡 EP 准证预评估和材料清单服务。",
    deliverables: ["候选人条件预评估", "公司资质检查清单", "申请材料清单", "办理周期和风险提示"],
    price: "¥8,000 起",
    duration: "3-5 个工作日",
    suitableFor: "首次派驻员工到新加坡的企业",
    featured: true,
  },
  {
    id: 2,
    title: "欧美远程员工合规诊断",
    supplierName: "欧美雇佣合规顾问",
    serviceType: "劳动法咨询",
    countries: "美国,德国,英国,法国,荷兰",
    summary: "梳理远程员工身份、合同、薪资税务、工时休假和解雇风险。",
    deliverables: ["用工模式诊断", "核心风险清单", "合同条款建议", "下一步整改路线"],
    price: "¥12,000 起",
    duration: "5-7 个工作日",
    suitableFor: "已有海外远程员工或准备跨国招聘的团队",
    featured: true,
  },
  {
    id: 3,
    title: "日本外籍员工入职手续包",
    supplierName: "东亚签证与用工中心",
    serviceType: "签证办理",
    countries: "日本",
    summary: "覆盖签证匹配、入职材料、劳动合同和社保登记提醒。",
    deliverables: ["签证路径建议", "入职材料列表", "合同审阅要点", "社保登记流程说明"],
    price: "¥9,800 起",
    duration: "5 个工作日",
    suitableFor: "准备在日本雇佣外籍员工的企业",
    featured: false,
  },
  {
    id: 4,
    title: "阿联酋自由区落地方案",
    supplierName: "中东企业落地服务",
    serviceType: "公司注册",
    countries: "阿联酋",
    summary: "帮助企业比较自由区、注册路径、签证配额和当地运营要求。",
    deliverables: ["自由区对比", "注册材料清单", "预算测算", "签证配额建议"],
    price: "¥18,000 起",
    duration: "7-10 个工作日",
    suitableFor: "准备在中东设立销售、服务或控股主体的企业",
    featured: true,
  },
  {
    id: 5,
    title: "拉美薪税合规月度顾问",
    supplierName: "拉美用工与薪税顾问",
    serviceType: "薪酬合规",
    countries: "巴西,墨西哥",
    summary: "提供当地薪资税务、福利缴纳、劳动合同和员工关系月度咨询。",
    deliverables: ["月度薪税咨询", "福利缴纳提醒", "合同问题答疑", "政策更新摘要"],
    price: "¥6,000/月 起",
    duration: "按月服务",
    suitableFor: "已有拉美员工且需要持续合规支持的企业",
    featured: false,
  },
];

export const brandProfiles: BrandProfile[] = [
  {
    id: 1,
    supplierId: 1,
    companyName: "新加坡卓越人力资源集团",
    headline: "东南亚雇佣与准证落地专家",
    intro: "面向中国出海企业提供新加坡、马来西亚和印度尼西亚的工作准证、雇佣合同、薪酬社保和本地雇主服务。",
    countries: "新加坡,马来西亚,印度尼西亚",
    services: "签证办理,EOR服务,薪酬合规,劳动合同",
    templateCode: "premium-asia",
    language: "中英双语",
    viewCount: 1286,
    status: "published",
  },
  {
    id: 2,
    supplierId: 2,
    companyName: "欧美雇佣合规顾问",
    headline: "欧美远程用工风险诊断与整改顾问",
    intro: "帮助企业处理欧美远程员工合同、薪资税务、员工分类、GDPR 和解雇流程风险。",
    countries: "美国,德国,英国,法国,荷兰",
    services: "劳动法咨询,税务合规,GDPR合规,员工关系",
    templateCode: "trust-advisory",
    language: "中文",
    viewCount: 964,
    status: "published",
  },
  {
    id: 3,
    supplierId: 4,
    companyName: "中东企业落地服务",
    headline: "阿联酋自由区注册与雇佣许可服务",
    intro: "为进入中东市场的企业提供自由区选择、公司注册、签证配额、雇佣许可和银行开户准备服务。",
    countries: "阿联酋,沙特阿拉伯",
    services: "公司注册,签证办理,EOR服务,薪酬合规",
    templateCode: "market-entry",
    language: "中英双语",
    viewCount: 732,
    status: "draft",
  },
];

export const insightReports: InsightReport[] = [
  {
    id: 1,
    title: "2026 东南亚用工需求趋势",
    category: "需求洞察",
    region: "东南亚",
    summary: "中国企业在新加坡、马来西亚和印尼的合规需求集中在工作准证、EOR、薪酬社保和本地合同。",
    metrics: [
      { label: "需求增长", value: "38%", trend: "较上季度提升" },
      { label: "热门服务", value: "签证办理", trend: "询价占比最高" },
      { label: "平均预算", value: "¥32,000", trend: "中位区间" },
    ],
    highlights: ["新加坡仍是区域总部首选", "EOR 适合早期试水团队", "印尼和马来西亚对本地合同要求更细"],
    publishedAt: "2026-06-12",
  },
  {
    id: 2,
    title: "欧美远程员工合规风险图谱",
    category: "风险洞察",
    region: "欧美",
    summary: "欧美市场的主要风险来自员工分类、当地薪资税务、解雇通知期和隐私数据处理。",
    metrics: [
      { label: "高频风险", value: "员工分类", trend: "咨询量最高" },
      { label: "重点国家", value: "美国/德国", trend: "复杂度较高" },
      { label: "整改周期", value: "2-4周", trend: "常见项目周期" },
    ],
    highlights: ["美国州法差异明显", "德国劳动保护规则严格", "GDPR 会影响人事数据处理"],
    publishedAt: "2026-06-15",
  },
  {
    id: 3,
    title: "中东公司落地服务价格观察",
    category: "价格洞察",
    region: "中东",
    summary: "阿联酋自由区服务报价受自由区类型、签证配额、办公地址和银行开户难度影响。",
    metrics: [
      { label: "起步报价", value: "¥18,000", trend: "注册咨询服务" },
      { label: "高频需求", value: "自由区比较", trend: "企业决策前置" },
      { label: "交付周期", value: "7-20天", trend: "视材料而定" },
    ],
    highlights: ["自由区选择影响后续经营范围", "签证配额需要提前规划", "银行开户材料准备越来越重要"],
    publishedAt: "2026-06-18",
  },
];

export const platformStats = {
  supplierCount: suppliers.length,
  requestCount: 520,
  completedCount: 386,
  countryCount: 30,
};

export function filterSuppliers(country?: string, serviceType?: string) {
  return suppliers
    .filter((item) => item.status === "approved")
    .filter((item) => !country || item.coverageCountries.includes(country))
    .filter((item) => !serviceType || item.serviceTypes.includes(serviceType))
    .sort((a, b) => Number(b.isSigned) - Number(a.isSigned) || Number(b.rating) - Number(a.rating));
}

export function getSupplierById(id: number) {
  return suppliers.find((item) => item.id === id);
}

export function filterServiceProducts(country?: string, serviceType?: string) {
  return serviceProducts
    .filter((item) => !country || item.countries.includes(country))
    .filter((item) => !serviceType || item.serviceType === serviceType)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getServiceProductById(id: number) {
  return serviceProducts.find((item) => item.id === id);
}

export function getInsightReportById(id: number) {
  return insightReports.find((item) => item.id === id);
}
