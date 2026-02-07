import { t } from "elysia";

const DEFAULT_EXPIRATION_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

export const CreateUrlDto = t.Object({
  originalUrl: t.String({
    title: "Original URL",
    description: "The original URL to shorten",
    examples: [
      {
        value: "https://www.google.com",
        description: "The original URL to shorten",
      },
    ],
    format: "uri",
  }),
  expirationDate: t.Date({
    title: "Expiration Date",
    description: "The date and time the URL will expire",
    default: DEFAULT_EXPIRATION_DATE,
    examples: [
      {
        value: DEFAULT_EXPIRATION_DATE,
        description: "This URL will expire in 30 days",
      },
    ],
  }),
});
