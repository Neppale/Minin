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
    const geoPluginResponse = (
      await axios.get<GeoPluginLocationData>(
        `http://www.geoplugin.net/json.gp?ip=${ip}`,
      )
    ).data;

    const WhatIsMyIpResponse = (
      await axios.post<{
        ip: string;
        geo: string;
        isp: string;
      }>('https://api.whatismyip.com/wimi.php', '', {
        headers: {
          Referer: 'https://www.whatismyip.com/',
          Origin: 'https://www.whatismyip.com',
          DNT: '1',
          'Sec-GPC': '1',
          Connection: 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'Content-Length': '0',
        },
      })
    ).data;

    const locationData = new LocationData(
      geoPluginResponse,
      WhatIsMyIpResponse,
    );
    return locationData;
  }
}
