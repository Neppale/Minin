import { Injectable } from '@nestjs/common';
import { GetLocationDataFromIp } from './useCases/get-location-data-from-ip';
import {
  GeoPluginLocationData,
  LocationData,
} from '../models/location-data.model';
import axios from 'axios';

@Injectable()
export class GetLocationDataFromIpService implements GetLocationDataFromIp {
  async get(ip: string): Promise<LocationData> {
    // TODo: catch exceptions
    const response = (
      await axios.get<GeoPluginLocationData>(
        `http://www.geoplugin.net/json.gp?ip=${ip}`,
      )
    ).data;

    const locationData = new LocationData(response);
    return locationData;
  }
}
