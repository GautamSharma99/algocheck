
## AlgoAudit - AI Architecture & Components

## Overview

AlgoAudit is an AI-powered auditing system for Algorand smart contracts (TEAL/AVM) built with Next.js, LangChain, and the Vercel AI SDK. The application uses large language models to analyze smart contracts, provide audit reports, and detect vulnerabilities.

## Core Technologies

* **LLM Provider**: OpenRouter (`z-ai/glm-4.5-air:free`)
* **Backend Framework**: Next.js with App Router
* **AI Frameworks**: LangChain.js, Vercel AI SDK
* **Agent Framework**: LangGraph
* **State Management**: React Server Components (RSC)
* **Streaming**: Real-time streaming via Vercel AI SDK

---

## 🔁 Key Change: LLM Integration

### Replace OpenAI with OpenRouter

Instead of:

```ts
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});
```

### ✅ Updated Version:

```ts
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "z-ai/glm-4.5-air:free",
  temperature: 0,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  },
});
```

---

## 🔄 Where to Apply Changes

Update **ALL instances** of `ChatOpenAI` across:

* `app/api/chat/route.ts`
* `/api/chat/agents`
* `/api/chat/retrieval`
* `/api/chat/retrieval_agents`
* `/api/chat/structured_output`
* `/app/ai_sdk/agent/action.ts`
* `/app/ai_sdk/tools/action.ts`
* `/app/langgraph/agent/agent.ts`

---

## ⚙️ Environment Variables

### Replace:

```env
OPENAI_API_KEY="your_openai_key"
```

### ✅ With:

```env
OPENROUTER_API_KEY="your_openrouter_key"
```

---

## 🧠 Notes on Compatibility

* `ChatOpenAI` still works because OpenRouter is OpenAI-compatible
* Function calling + tools → ✅ Supported
* Streaming → ✅ Supported
* Structured output → ✅ Works (may need stricter prompting)

---

## ⚠️ Optional Headers (Recommended for OpenRouter)

```ts
configuration: {
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AlgoAudit",
  },
}
```

---

## 🧩 No Other Changes Needed

Everything else in your architecture remains the same:

* Agents ✅
* LangGraph ✅
* RAG ✅
* Streaming ✅
* Zod structured output ✅

---

## 🚀 Result

You’ve now:

* Removed OpenAI dependency
* Integrated **free OpenRouter model**
* Kept full LangChain compatibility
* Maintained streaming + agents

---

Second task:

Panel Feedback:
Your project addresses a relevant problem with a clear Algorand focus and a feasible MVP scope. To strengthen your submission, consider detailing how you will handle complex contract patterns and scale the AI analysis. Also, clarify plans for integrating Algorand-specific tooling beyond API calls. Focus on delivering a working MVP that provides actionable audit reports within 1 month.

