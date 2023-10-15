export interface GetOriginalUrlByShortCode {
  get(shortCode: string): Promise<string>;
}
