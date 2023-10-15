export interface CheckAvailableShortenedUrlRepository {
  check(url: string): Promise<boolean>;
}
