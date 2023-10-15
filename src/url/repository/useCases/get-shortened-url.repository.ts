export interface GetOriginalUrlByShortCodeRepository {
  get(shortCode: string): Promise<string>;
}
