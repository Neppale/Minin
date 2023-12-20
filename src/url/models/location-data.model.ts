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
  isp: string;
  location: string;

  constructor(
    geoPluginLocationData: GeoPluginLocationData,
    whatIsMyIpAddressLocationData: WhatIsMyIpAddressLocationData,
  ) {
    this.country = geoPluginLocationData.geoplugin_countryName;
    this.region = geoPluginLocationData.geoplugin_region;
    this.city = geoPluginLocationData.geoplugin_city;
    this.latitude = geoPluginLocationData.geoplugin_latitude;
    this.longitude = geoPluginLocationData.geoplugin_longitude;
    this.timezone = geoPluginLocationData.geoplugin_timezone;
    this.asn = geoPluginLocationData.geoplugin_areaCode;
    this.postalCode = geoPluginLocationData.geoplugin_dmaCode;
    this.locationRadius =
      geoPluginLocationData.geoplugin_locationAccuracyRadius;
    this.isp = whatIsMyIpAddressLocationData.isp;
    this.location = whatIsMyIpAddressLocationData.geo;
  }
}

export interface WhatIsMyIpAddressLocationData {
  ip: string;
  geo: string;
  isp: string;
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
