export interface CheckAvailableShortenedUrlRepository {
  check(shortCode: string): Promise<boolean>;
}
