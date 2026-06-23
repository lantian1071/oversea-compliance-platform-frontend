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
