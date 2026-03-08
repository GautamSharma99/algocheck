import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { decodeAlgorandProgram } from "@/utils/decoderBase64";

export const runtime = "edge";

//INSTRUCTIONS FOR THE MODEL
const TEMPLATE = `You are an expert Algorand smart contract security auditor specializing in TEAL and the Algorand Virtual Machine (AVM). Your task is to analyze the provided TEAL smart contract and generate a comprehensive security audit report.

Decode {input} from Base64 string to a TEAL Version 8 and Analyze the following TEAL code.

Please structure your report in markdown format with the following three sections:

1. Plain-Language Summary
Provide a concise, high-level explanation of what this contract does. Address the following points:

Purpose: What is the main goal of the contract? (e.g., DEX, escrow, staking).

Key Functions: What are the primary actions or methods a user can call?

Actors & Permissions: Who can call the critical functions? Is there an admin or creator with special privileges?

State Changes: What global or local state variables does the contract modify?

2. Risk Detection Analysis
Thoroughly audit the code for security vulnerabilities and suspicious patterns. For each finding, create a separate entry using the template below. Flag patterns like (but not limited to):

Unprotected global state writes or deletes.

Asset transfers to arbitrary or unchecked addresses.

Risks related to rekeying (RekeyTo).

Improper transaction fee checks that could drain the contract.

Integer overflow or underflow vulnerabilities.

Access control issues where a non-authorized user can perform privileged actions.

If no vulnerabilities are found, state that clearly.

3. Vulnerability Details & Recommendations
For each vulnerability identified in the section above, use the following template:

Finding #[Number]: [Clear Title of the Vulnerability]

Severity: [Low / Medium / High]

Description: A detailed, plain-language explanation of the risk, what an attacker could do, and why it's a problem.

Explainability (Triggering Opcodes): Pinpoint and show the specific TEAL opcodes or code block that triggered this warning.
Recommendation: Provide a clear, AI-generated suggestion on how to remediate the vulnerability and fix the code.
`;

/**
 * This handler initializes and calls an OpenAI Functions powered
 * structured output chain. See the docs for more information:
 *
 * https://js.langchain.com/v0.2/docs/how_to/structured_output
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const currentMessageContent = messages[messages.length - 1].content;

    // Extract application ID from the input
    const appIdMatch = currentMessageContent.match(/\b(\d+)\b/);
    if (!appIdMatch) {
      return NextResponse.json(
        { error: "No application ID found in the input" },
        { status: 400 }
      );
    }

    const applicationId = appIdMatch[1];

    // Make API call to Algonode
    const algoNodeUrl = `https://mainnet-api.algonode.cloud/v2/applications/${applicationId}`;
    const response = await fetch(algoNodeUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch application data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const applicationData = await response.json();

      // Extract approval-program from params
      const approvalProgram = applicationData?.params?.["approval-program"];

      if (!approvalProgram) {
        return NextResponse.json(
          { error: "Approval program not found in application data" },
          { status: 404 }
        );
      }

      // Define schema for the response
      const schemaAPI = z
        .object({
          application_id: z.string().describe("The application ID from the input"),
          approval_program: z.string().describe("The approval program from the Algorand application"),
          entity: z.string().describe("The entity mentioned in the input"),
          chat_response: z.string().describe("A response about the application data"),
        })
        .describe("Application data with approval program");

      // Prepare structured response
      const resultAPI = {
        application_id: applicationId,
        approval_program: approvalProgram,
        entity: `Algorand Application ${applicationId}`,
        chat_response: `Retrieved approval program for Algorand application ${applicationId}`,
      };
     
  

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    /**
     * Function calling is currently only supported with ChatOpenAI models
     */
    const model = new ChatOpenAI({
      temperature: 0.8,
      model: "gpt-4o-mini",
    });

    /**
     * We use Zod (https://zod.dev) to define our schema for convenience,
     * but you can pass JSON schema if desired.
     */
    // Define a structured schema for a contract audit response
    const vulnerabilitySchema = z
      .object({
        number: z.number().describe("Ordinal number of the finding"),
        title: z.string().describe("Title of the vulnerability"),
        severity: z
          .enum(["Low", "Medium", "High", "Critical"]) 
          .optional()
          .describe("Severity rating"),
        description: z
          .string()
          .describe("Plain-language description of the issue and impact"),
        triggering_opcodes: z
          .array(z.string())
          .optional()
          .describe("Relevant TEAL opcodes or code snippets that triggered the warning"),
        recommendation: z
          .string()
          .describe("Concrete recommendation to remediate the issue"),
      })
      .describe("One detailed vulnerability finding");

    const schema = z
      .object({
        summary: z
          .string()
          .describe(
            "Summary",
          ),
        key_functions: z
          .array(z.string())
          .default([])
          .describe("Bullet list of key functions or actions available"),
        actors_permissions: z
          .array(z.string())
          .default([])
          .describe("Bullet list describing actors and their permissions"),
        state_changes: z
          .array(z.string())
          .default([])
          .describe("Bullet list of global/local state mutated by the contract"),
        risks: z
          .array(z.string())
          .default([])
          .describe("List of risk detections in short bullet form"),
        vulnerabilities: z
          .array(vulnerabilitySchema)
          .default([])
          .describe("Detailed vulnerability entries with severity and recommendations"),
      })
      .describe("Algorand contract audit structured response");

    /**
     * Bind schema to the OpenAI model.
     * Future invocations of the returned model will always match the schema.
     *
     * Under the hood, uses tool calling by default.
     */
    const functionCallingModel = model.withStructuredOutput(schema, {
      name: "output_formatter",
    });

    /**
     * Returns a chain with the function calling model.
     */
    const chain = prompt.pipe(functionCallingModel);
    const smart_contract = resultAPI.approval_program;
    //SMART CONTRACT PASSING TO MODEL
    const structured = await chain.invoke({
      input: smart_contract,
    });

    // Attach useful metadata
    const result = {
      application_id: applicationId,
      ...structured,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}