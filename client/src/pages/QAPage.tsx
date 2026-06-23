import { Bot, ChevronRight, Loader2, MessageSquare, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const suggestedQuestions = [
  "新加坡 EP 准证申请条件是什么？",
  "德国劳动法对解雇员工有哪些要求？",
  "美国 EOR 服务通常适合什么场景？",
  "越南雇主需要缴纳哪些社保？",
  "日本雇佣外籍员工需要哪些手续？",
  "阿联酋自由区注册公司有什么优势？",
];

const answers: Record<string, string> = {
  新加坡: "新加坡常见工作准证包括 EP、S Pass 等。企业通常需要先确认岗位、薪资、候选人学历经验和公司资质。实际审批会受行业、薪资水平和候选人背景影响。",
  德国: "德国用工对劳动合同、工时、休假、解雇通知期和员工代表机制较为严格。涉及解雇时，建议先确认适用的雇佣保护规则和书面流程。",
  美国: "美国各州规则差异明显。远程雇佣、薪资税、员工分类和福利要求都需要按州判断。EOR 可用于快速雇佣，但仍需确认岗位管理和合规责任边界。",
  越南: "越南雇佣通常涉及劳动合同、个人所得税、社会保险、健康保险和失业保险。外籍员工还可能涉及工作许可或豁免条件。",
  日本: "日本雇佣外籍员工通常需要匹配签证类型、岗位职责和候选人背景，同时关注入职手续、社保、劳动合同和工时管理。",
  阿联酋: "阿联酋自由区通常在公司设立、外资持股、办公地址和签证配额方面有便利条件，但不同自由区规则和成本不同，需要按业务范围选择。",
};

type Message = { role: "user" | "assistant"; content: string };

function getAnswer(question: string) {
  const key = Object.keys(answers).find((item) => question.includes(item));
  return `${key ? answers[key] : "这个问题可以先从目标国家、员工身份、雇佣模式、薪资福利和合同安排五个方面梳理。"}\n\n静态托管版本无法连接实时 AI 或法规数据库，因此这里提供的是演示性回答。正式使用时建议接入后端问答服务，并由专业顾问复核。`;
}

export default function QAPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setIsLoading(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getAnswer(content) }]);
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border/60 bg-white/80 backdrop-blur-sm">
        <div className="container py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-foreground text-xl">出海合规智能问答</h1>
              <p className="text-sm text-muted-foreground">静态演示回答，正式上线可接入真实 AI 服务。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 gap-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 shadow-elegant">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">您好，我是出海合规顾问</h2>
            <p className="text-muted-foreground text-center max-w-md mb-10 leading-relaxed">
              可以询问劳动法、工作签证、薪酬合规、社保和 EOR 相关问题。
            </p>
            <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-2.5">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border/60 bg-card text-sm text-left hover:border-primary/40 hover:bg-primary/4 transition-all group shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  <span className="line-clamp-1">{question}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="flex-1 space-y-6 pb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-indigo-600 text-white"}`}>
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed whitespace-pre-line ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border/60 text-foreground rounded-tl-sm shadow-sm"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">正在整理回答...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        <div className="sticky bottom-0 bg-background pt-2 pb-4">
          <div className="relative bg-card border border-border/80 rounded-2xl shadow-elegant-lg focus-within:border-primary/50 transition-colors">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="输入您的出海合规问题"
              rows={1}
              className="w-full px-5 py-4 pr-14 bg-transparent text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none leading-relaxed"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">回答仅供参考，具体合规事项请咨询当地专业顾问。</p>
        </div>
      </div>
    </div>
  );
}
