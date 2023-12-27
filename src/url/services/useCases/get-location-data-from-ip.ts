import { LocationData } from '../../models/location-data.model';

export interface GetLocationDataFromIp {
  get(ip: string): Promise<LocationData>;
}
