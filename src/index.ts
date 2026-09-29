#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

import { DODO_TOOLS } from "./tools/definitions.js";
import { handleToolCall } from "./tools/handlers.js";
import { DODO_RESOURCES, getResourceContent } from "./resources/index.js";
import { DODO_PROMPTS, getPromptMessages } from "./prompts/index.js";

dotenv.config();

const server = new Server(
  {
    name: "dodopayments-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// 1. Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: DODO_TOOLS,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    const result = await handleToolCall(name, args || {});
    return {
      content: [
        {
          type: "text",
          text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: message }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// 2. Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: DODO_RESOURCES,
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  try {
    const text = getResourceContent(uri);
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text,
        },
      ],
    };
  } catch (error: unknown) {
    throw new McpError(ErrorCode.InvalidRequest, `Resource not found: ${uri}`);
  }
});

// 3. Prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: DODO_PROMPTS,
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    const messages = getPromptMessages(name, args as Record<string, string>);
    return {
      messages,
    };
  } catch (error: unknown) {
    throw new McpError(ErrorCode.InvalidRequest, `Prompt not found: ${name}`);
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dodo Payments MCP Server running on stdio");
}

run().catch((error) => {
  console.error("Fatal error starting Dodo Payments MCP Server:", error);
  process.exit(1);
});
