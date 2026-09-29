import DodoPayments from "dodopayments";
import dotenv from "dotenv";

dotenv.config();

export function getDodoClient(): DodoPayments {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const env = (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode";

  if (!apiKey) {
    throw new Error(
      "DODO_PAYMENTS_API_KEY environment variable is required. Please set it in your environment or .env file."
    );
  }

  return new DodoPayments({
    bearerToken: apiKey,
    environment: env,
  });
}

export function getBaseUrl(): string {
  const env = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live" : "test";
  return `https://${env}.dodopayments.com`;
}

export function getAuthHeaders(): Record<string, string> {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  if (!apiKey) {
    throw new Error("DODO_PAYMENTS_API_KEY environment variable is not configured.");
  }
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}
