export class LocationData {
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  timezone: string;
  asn: string;
  postalCode: string;
  locationRadius: string;

  constructor(locationData: GeoPluginLocationData) {
    this.country = locationData.geoplugin_countryName;
    this.region = locationData.geoplugin_region;
    this.city = locationData.geoplugin_city;
    this.latitude = locationData.geoplugin_latitude;
    this.longitude = locationData.geoplugin_longitude;
    this.timezone = locationData.geoplugin_timezone;
    this.asn = locationData.geoplugin_areaCode;
    this.postalCode = locationData.geoplugin_dmaCode;
    this.locationRadius = locationData.geoplugin_locationAccuracyRadius;
  }
}

export interface GeoPluginLocationData {
  geoplugin_request: string;
  geoplugin_status: number;
  geoplugin_delay: string;
  geoplugin_credit: string;
  geoplugin_city: string;
  geoplugin_region: string;
  geoplugin_regionCode: string;
  geoplugin_regionName: string;
  geoplugin_areaCode: string;
  geoplugin_dmaCode: string;
  geoplugin_countryCode: string;
  geoplugin_countryName: string;
  geoplugin_inEU: number;
  geoplugin_euVATrate: boolean;
  geoplugin_continentCode: string;
  geoplugin_continentName: string;
  geoplugin_latitude: string;
  geoplugin_longitude: string;
  geoplugin_locationAccuracyRadius: string;
  geoplugin_timezone: string;
  geoplugin_currencyCode: string;
  geoplugin_currencySymbol: string;
  geoplugin_currencySymbol_UTF8: string;
  geoplugin_currencyConverter: number;
}
