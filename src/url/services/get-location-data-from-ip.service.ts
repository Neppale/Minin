import { Injectable } from '@nestjs/common';
import { GetLocationDataFromIp } from './useCases/get-location-data-from-ip';
import {
  GeoPluginLocationData,
  LocationData,
} from '../models/location-data.model';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class GetLocationDataFromIpService implements GetLocationDataFromIp {
  async get(ip: string): Promise<LocationData> {
    // TODO: catch exceptions
    const geoPluginResponse = (
      await axios
        .get<GeoPluginLocationData>(`http://www.geoplugin.net/json.gp?ip=${ip}`)
        .catch(() => {
          return {
            data: {
              geoplugin_areaCode: '',
              geoplugin_city: '',
              geoplugin_countryName: '',
              geoplugin_latitude: '',
              geoplugin_locationAccuracyRadius: '',
              geoplugin_longitude: '',
              geoplugin_dmaCode: '',
              geoplugin_region: '',
              geoplugin_timezone: '',
            },
          };
        })
    ).data;

    const response = (
      await axios.get(`https://www.whtop.com/tools.ip/${ip}`).catch(() => {
        return {
          data: '',
        };
      })
    ).data;
    const rawWhtopHtml = response;

    const cheerio = load(rawWhtopHtml);
    const location = cheerio('tr:contains("City") td:last-child').text().trim();
    const isp = cheerio('tr:contains("ISP Name / URL") td:last-child')
      .text()
      .trim();

    const locationData: LocationData = {
      asn: geoPluginResponse.geoplugin_areaCode,
      city: geoPluginResponse.geoplugin_city,
      country: geoPluginResponse.geoplugin_countryName,
      isp,
      latitude: geoPluginResponse.geoplugin_latitude,
      location,
      locationRadius: geoPluginResponse.geoplugin_locationAccuracyRadius,
      longitude: geoPluginResponse.geoplugin_longitude,
      postalCode: geoPluginResponse.geoplugin_dmaCode,
      region: geoPluginResponse.geoplugin_region,
      timezone: geoPluginResponse.geoplugin_timezone,
    };

    return locationData;
  }
}
