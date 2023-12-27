import axios from 'axios';
import { GetLocationDataFromIpService } from '../../services/get-location-data-from-ip.service';

type SutOutput = {
  sut: GetLocationDataFromIpService;
};

const makeSut = (): SutOutput => {
  const sut = new GetLocationDataFromIpService();
  return {
    sut,
  };
};

describe('GetLocationDataFromIpService', () => {
  it('should return a LocationData', async () => {
    const { sut } = makeSut();
    // mock axios
    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValueOnce({
      data: {
        geoplugin_areaCode: 'any_area_code',
        geoplugin_city: 'any_city',
        geoplugin_countryName: 'any_country_name',
        geoplugin_latitude: 'any_latitude',
        geoplugin_locationAccuracyRadius: 'any_location_accuracy_radius',
        geoplugin_longitude: 'any_longitude',
        geoplugin_dmaCode: 'any_dma_code',
        geoplugin_region: 'any_region',
        geoplugin_timezone: 'any_timezone',
      },
    });
    const locationData = await sut.get('any_ip');
    expect(locationData).toEqual({
      asn: 'any_area_code',
      city: 'any_city',
      country: 'any_country_name',
      isp: '',
      latitude: 'any_latitude',
      location: '',
      locationRadius: 'any_location_accuracy_radius',
      longitude: 'any_longitude',
      postalCode: 'any_dma_code',
      region: 'any_region',
      timezone: 'any_timezone',
    });
  });

  it('should return a LocationData with empty values if axios.get throws', async () => {
    const { sut } = makeSut();
    // mock axios
    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockRejectedValueOnce(new Error());
    const locationData = await sut.get('any_ip');
    expect(locationData).toEqual({
      asn: '',
      city: '',
      country: '',
      isp: '',
      latitude: '',
      location: '',
      locationRadius: '',
      longitude: '',
      postalCode: '',
      region: '',
      timezone: '',
    });
  });
});
