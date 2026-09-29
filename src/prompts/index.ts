import { Prompt } from "@modelcontextprotocol/sdk/types.js";

export const DODO_PROMPTS: Prompt[] = [
  {
    name: "setup-checkout",
    description: "Guide to implementing Dodo Payments hosted checkout sessions in any web framework.",
    arguments: [
      {
        name: "framework",
        description: "Target framework (e.g. Next.js, Express, FastAPI, SvelteKit)",
        required: false,
      },
    ],
  },
  {
    name: "setup-webhooks",
    description: "Guide to setting up Standard Webhooks signature verification and event handling.",
    arguments: [
      {
        name: "events",
        description: "Events to handle (e.g. 'payment.succeeded, subscription.active')",
        required: false,
      },
    ],
  },
];

export function getPromptMessages(name: string, args?: Record<string, string>): any[] {
  const framework = args?.framework || "Next.js App Router";
  const events = args?.events || "payment.succeeded, payment.failed, subscription.active, subscription.renewed";

  switch (name) {
    case "setup-checkout":
      return [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please set up Dodo Payments checkout sessions in ${framework}. Use the official SDK 'dodopayments', create a server route to call 'client.checkoutSessions.create', and return the 24-hour 'checkout_url' to redirect the user.`,
          },
        },
      ];
    case "setup-webhooks":
      return [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please implement a webhook endpoint verifying incoming Dodo Payments webhooks with 'standardwebhooks'. Check headers 'webhook-id', 'webhook-timestamp', and 'webhook-signature'. Handle these events: ${events}. Always fulfill from the webhook rather than client return URLs.`,
          },
        },
      ];
    default:
      throw new Error(`Prompt not found: ${name}`);
  }
}
