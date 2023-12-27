import { Injectable } from '@nestjs/common';
import { GetUrlStatisticsRepository } from './useCases/get-url-statistics.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UrlStatistics } from '../models/url-statistics.model';

@Injectable()
export class GetUrlStatisticsPrisma implements GetUrlStatisticsRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async get(shortCode: string): Promise<UrlStatistics> {
    const totalClicks = await this.prisma.click.count({
      where: {
        url: {
          shortCode,
        },
      },
    });

    const lastClickDate = await this.prisma.click.findFirst({
      where: {
        url: {
          shortCode,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const countryStatistics = await this.prisma.click
      .groupBy({
        by: ['country'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          country: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            country: item.country,
            totalClicks: item._count.country,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const cityStatistics = await this.prisma.click
      .groupBy({
        by: ['city'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          city: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            city: item.city,
            totalClicks: item._count.city,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const browserStatistics = await this.prisma.click
      .groupBy({
        by: ['browser'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          browser: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            browser: item.browser,
            totalClicks: item._count.browser,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const platformStatistics = await this.prisma.click
      .groupBy({
        by: ['platform'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          platform: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            platform: item.platform,
            totalClicks: item._count.platform,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const deviceStatistics = await this.prisma.click
      .groupBy({
        by: ['device', 'deviceVendor', 'deviceModel'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          device: true,
          deviceVendor: true,
          deviceModel: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            device: item.device,
            deviceVendor: item.deviceVendor,
            deviceModel: item.deviceModel,
            totalClicks: item._count.device,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const referrerStatistics = await this.prisma.click
      .groupBy({
        by: ['referrer'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          referrer: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            referrer: item.referrer,
            totalClicks: item._count.referrer,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const asnStatistics = await this.prisma.click
      .groupBy({
        by: ['asn'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          asn: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            asn: item.asn,
            totalClicks: item._count.asn,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const timeStatistics = await this.prisma.click
      .groupBy({
        by: ['createdAt'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          createdAt: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            timestamp: item.createdAt,
            totalClicks: item._count.createdAt,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const userAgentStatistics = await this.prisma.click
      .groupBy({
        by: ['userAgent'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          userAgent: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            userAgent: item.userAgent,
            totalClicks: item._count.userAgent,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const ispStatistics = await this.prisma.click
      .groupBy({
        by: ['isp'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          isp: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            isp: item.isp,
            totalClicks: item._count.isp,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    const tagStatistics = await this.prisma.click
      .groupBy({
        by: ['tags'],
        where: {
          url: {
            shortCode,
          },
        },
        _count: {
          tags: true,
        },
      })
      .then((data) => {
        return data.map((item) => {
          return {
            tags: item.tags,
            totalClicks: item._count.tags,
            lastClickDate: lastClickDate.createdAt, // TODO: fix this
          };
        });
      });

    return {
      totalClicks,
      lastClickDate: lastClickDate.createdAt,
      countryStatistics,
      cityStatistics,
      browserStatistics,
      platformStatistics,
      deviceStatistics,
      referrerStatistics,
      asnStatistics,
      timeStatistics,
      userAgentStatistics,
      ispStatistics,
      tagStatistics,
    };
  }
}
