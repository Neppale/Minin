import { SendClickDataInput } from "../../core/useCases/send-click-data";

export function generateClickData(
  id: string,
  request: Request
): SendClickDataInput {
  return {
    urlId: id,
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    country:
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-vercel-ip-country") ??
      undefined,
  };
}
