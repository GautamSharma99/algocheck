import { cn } from "@/utils/cn";
import type { Message } from "ai/react";

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}) {
  // Try to detect structured JSON audit payloads and render them nicely
  let structured: null | {
    application_id?: string;
    summary?: string;
    key_functions?: string[];
    actors_permissions?: string[];
    state_changes?: string[];
    risks?: string[];
    vulnerabilities?: Array<{
      number?: number;
      title?: string;
      severity?: string;
      description?: string;
      triggering_opcodes?: string[];
      recommendation?: string;
    }>;
  } = null;

  if (props.message.role !== "user") {
    try {
      const parsed = JSON.parse(String(props.message.content));
      if (
        parsed &&
        (parsed.summary || parsed.vulnerabilities || parsed.risks)
      ) {
        structured = parsed;
      }
    } catch {}
  }

  return (
    <div
      className={cn(
        `rounded-[24px] max-w-[80%] mb-8 flex`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2"
          : null,
        props.message.role === "user" ? "ml-auto" : "mr-auto",
      )}
    >
      {props.message.role !== "user" && (
        <div className="mr-4 border bg-secondary -mt-2 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {props.aiEmoji?.startsWith('/') ? (
            <img 
              src={props.aiEmoji} 
              alt="AI Assistant" 
              className="w-6 h-6"
            />
          ) : (
            props.aiEmoji
          )}
        </div>
      )}

      <div className="whitespace-pre-wrap flex flex-col">
        {structured ? (
          <div className="space-y-4">
            {structured.application_id ? (
              <div className="text-xs text-muted-foreground">
                App ID: {structured.application_id}
              </div>
            ) : null}
            {structured.summary ? (
              <div>
                <h3 className="font-semibold mb-1">Summary</h3>
                <p>{structured.summary}</p>
              </div>
            ) : null}
            {structured.key_functions && structured.key_functions.length ? (
              <div>
                <h3 className="font-semibold mb-1">Key Functions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {structured.key_functions.map((f, i) => (
                    <li key={`kf-${i}`}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {structured.actors_permissions && structured.actors_permissions.length ? (
              <div>
                <h3 className="font-semibold mb-1">Actors & Permissions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {structured.actors_permissions.map((a, i) => (
                    <li key={`ap-${i}`}>{a}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {structured.state_changes && structured.state_changes.length ? (
              <div>
                <h3 className="font-semibold mb-1">State Changes</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {structured.state_changes.map((s, i) => (
                    <li key={`sc-${i}`}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {structured.risks && structured.risks.length ? (
              <div>
                <h3 className="font-semibold mb-1">Risk Detection Analysis</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {structured.risks.map((r, i) => (
                    <li key={`risk-${i}`}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {structured.vulnerabilities && structured.vulnerabilities.length ? (
              <div>
                <h3 className="font-semibold mb-2">Vulnerability Details & Recommendations</h3>
                <div className="space-y-3">
                  {structured.vulnerabilities.map((v, i) => (
                    <div key={`vuln-${i}`} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          Finding #{v.number ?? i + 1}: {v.title}
                        </span>
                        {v.severity ? (
                          <span className="text-xs uppercase tracking-wide bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            {v.severity}
                          </span>
                        ) : null}
                      </div>
                      {v.description ? (
                        <p className="mt-2 text-sm">{v.description}</p>
                      ) : null}
                      {v.triggering_opcodes && v.triggering_opcodes.length ? (
                        <div className="mt-2">
                          <div className="text-xs font-semibold mb-1">
                            Triggering Opcodes
                          </div>
                          <pre className="text-xs bg-secondary rounded p-2 whitespace-pre-wrap">
                            {v.triggering_opcodes.join("\n")}
                          </pre>
                        </div>
                      ) : null}
                      {v.recommendation ? (
                        <div className="mt-2">
                          <div className="text-xs font-semibold mb-1">
                            Recommendation
                          </div>
                          <p className="text-sm">{v.recommendation}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <span>{props.message.content}</span>
        )}

        {props.sources && props.sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-primary px-2 py-1 rounded">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-primary px-2 py-1 rounded text-xs">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : null}
      </div>
    </div>
  );
}
