export class UrlStatistics {
  totalClicks: number;
  lastClickDate: Date;
  countryStatistics: LocationStatisticsByCountry[];
  cityStatistics: LocationStatisticsByCity[];
  browserStatistics: BrowserStatistics[];
  platformStatistics: PlatformStatistics[];
  deviceStatistics: DeviceStatistics[];
  referrerStatistics: ReferrerStatistics[];
  asnStatistics: AsnStatistics[];
  timeStatistics: TimeStatistics[];
  userAgentStatistics: UserAgentStatistics[];
  ispStatistics: IspStatistics[];
  tagStatistics: TagStatistics[];
}

export class LocationStatisticsByCountry {
  country: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class LocationStatisticsByCity {
  city: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class BrowserStatistics {
  browser: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class PlatformStatistics {
  platform: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class DeviceStatistics {
  device: string;
  deviceVendor: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class ReferrerStatistics {
  referrer: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class AsnStatistics {
  asn: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class TimeStatistics {
  timestamp: Date;
  totalClicks: number;
  // Additional properties if needed
}

export class UserAgentStatistics {
  userAgent: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class IspStatistics {
  isp: string;
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}

export class TagStatistics {
  tags: string[];
  totalClicks: number;
  lastClickDate: Date;
  // Additional properties if needed
}
