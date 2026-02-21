import { t } from "elysia";

export const LoadUrlDto = t.Object({
  id: t.String({
    title: "URL ID",
    description: "The ID of the URL to redirect to",
    examples: [
      {
        value: "47oOW0fe11",
        description: "This is the ID of the URL to redirect to",
      },
    ],
    pattern: "[a-zA-Z0-9]{5,10}",
  }),
});
