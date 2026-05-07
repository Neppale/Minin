export type Click = {
  id: number;
  urlId: string;
  clickedAt: Date;
  ipAddress?: string | null;
  country?: string | null;
  userAgent?: string | null;
  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;
};

export type CreateClickData = {
  urlId: string;
  clickedAt: Date;
  ip?: string | null;
  country?: string | null;
  userAgent?: string | null;
  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;
};
