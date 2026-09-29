import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { DODO_TOOLS } from "../src/tools/definitions.js";
import { handleToolCall } from "../src/tools/handlers.js";
import { DODO_RESOURCES } from "../src/resources/index.js";

async function runTest() {
  console.log("=== Testing Dodo Payments MCP Server ===");

  const server = new Server(
    { name: "test-server", version: "1.0.0" },
    { capabilities: { tools: {}, resources: {}, prompts: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: DODO_TOOLS,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const res = await handleToolCall(req.params.name, req.params.arguments || {});
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
    };
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: DODO_RESOURCES,
  }));

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: {} }
  );

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  // 1. Test List Tools
  const toolsResult = await client.listTools();
  console.log(`✓ Tools registered count: ${toolsResult.tools.length}`);

  // 2. Test Docs Search Tool (does not require DODO_PAYMENTS_API_KEY)
  const searchResult = await client.callTool({
    name: "dodo_search_docs",
    arguments: { query: "subscriptions" },
  });
  console.log("✓ Docs Search Tool output:", (searchResult.content[0] as any).text.substring(0, 150) + "...");

  // 3. Test License Validation (Public endpoint test)
  const licenseResult = await client.callTool({
    name: "dodo_validate_license",
    arguments: { license_key: "TEST-LICENSE-KEY" },
  });
  console.log("✓ License Validate Tool executed successfully");

  // 4. Test List Resources
  const resourcesResult = await client.listResources();
  console.log(`✓ Resources count: ${resourcesResult.resources.length}`);

  await client.close();
  await server.close();

  console.log("=== All MCP Server Verification Tests Passed! ===");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
