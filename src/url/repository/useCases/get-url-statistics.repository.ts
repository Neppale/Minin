import { UrlStatistics } from '../../models/url-statistics.model';

export interface GetUrlStatisticsRepository {
  get(shortCode: string): Promise<UrlStatistics>;
}
