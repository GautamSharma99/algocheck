import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";

export default function AgentsPage() {
  const InfoCard = (
    <GuideInfoBox>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">
          AI that explains, audits, and secures your Algorand smart contracts.
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          An AI-powered tool that analyzes Algorand smart contracts, explains their behavior in plain language, highlights risks with severity levels, and suggests improvements with clear references to the underlying TEAL code.
        </p>
      </div>
    </GuideInfoBox>
  );

  return (
    <ChatWindow
      endpoint="api/chat/retrieval_agents"
      emptyStateComponent={InfoCard}
      showIngestForm={true}
      showIntermediateStepsToggle={true}
      placeholder={
        'Beep boop! I\'m a robot retrieval-focused agent! Ask, "What are some ways of doing retrieval in LangChain.js?"'
      }
      emoji="🤖"
    />
  );
}
