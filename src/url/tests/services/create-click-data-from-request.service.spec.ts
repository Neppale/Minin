import { CreateClickDataFromRequestService } from '../../services/create-click-data-from-request.service';
import { CreateClickDataFromRequestRepositoryMock } from '../mock/repository/create-click-data-from-request.repository.mock';
import { GetLocationDataFromIpServiceMock } from '../mock/services/get-location-data-from-ip.service.mock';
import { Request } from 'express';

type SutOutput = {
  sut: CreateClickDataFromRequestService;
  createClickDataFromRequestRepositoryMock: CreateClickDataFromRequestRepositoryMock;
  getLocationDataFromIpServiceMock: GetLocationDataFromIpServiceMock;
};

const makeSut = (): SutOutput => {
  const createClickDataFromRequestRepositoryMock =
    new CreateClickDataFromRequestRepositoryMock();
  const getLocationDataFromIpServiceMock =
    new GetLocationDataFromIpServiceMock();
  const sut = new CreateClickDataFromRequestService(
    createClickDataFromRequestRepositoryMock,
    getLocationDataFromIpServiceMock,
  );
  return {
    sut,
    createClickDataFromRequestRepositoryMock,
    getLocationDataFromIpServiceMock,
  };
};

describe('CreateClickDataFromRequestService', () => {
  describe('create', () => {
    it('should call getLocationDataFromIpService once', async () => {
      const { sut, getLocationDataFromIpServiceMock } = makeSut();
      const request: Request = {
        headers: {
          referer: 'referrer',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
        socket: {
          remoteAddress: 'ip',
        },
        ip: 'ip',
        url: 'url/abc123',
      } as unknown as Request<any>;
      await sut.create(request);
      expect(getLocationDataFromIpServiceMock.count).toBe(1);
    });

    it('should call createClickDataFromRequestRepository once', async () => {
      const { sut, createClickDataFromRequestRepositoryMock } = makeSut();
      const request: Request = {
        headers: {
          referer: 'referrer',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
        socket: {
          remoteAddress: '',
        },
        ip: 'ip',
        url: 'url/abc123',
      } as unknown as Request<any>;
      await sut.create(request);
      expect(createClickDataFromRequestRepositoryMock.count).toBe(1);
    });
  });
});
