/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocationData } from '../../../models/location-data.model';
import { GetLocationDataFromIpService } from '../../../services/get-location-data-from-ip.service';

export class GetLocationDataFromIpServiceMock
  implements GetLocationDataFromIpService
{
  count = 0;
  response = {
    asn: 'asn',
    city: 'city',
    country: 'country',
    isp: 'isp',
    latitude: 'latitude',
    longitude: 'longitude',
    locationRadius: 'locationRadius',
    postalCode: 'postalCode',
    region: 'region',
    timezone: 'timezone',
    location: 'location',
  };
  async get(_ip: string): Promise<LocationData> {
    this.count++;
    return this.response;
  }
}
