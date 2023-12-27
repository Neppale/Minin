import { UrlStatistics } from '../../models/url-statistics.model';

export interface GetUrlStatistics {
  get(shortCode: string, authorization: string): Promise<UrlStatistics>;
}
