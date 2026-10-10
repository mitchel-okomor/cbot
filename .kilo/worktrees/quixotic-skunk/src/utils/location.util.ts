import { Inject, Logger } from '@nestjs/common';
import { Location } from '../interfaces';
import NodeGeocoder from './node-geocoder';
import RequestUtil from './request.utils';

export class LocationUtil {
  private readonly logger = new Logger(LocationUtil.name);

  constructor(@Inject(NodeGeocoder) private readonly geocoder: NodeGeocoder) {}

  static emptyState: Location = {
    name: '',
    address: '',
    city: '',
    country: '',
    countryCode: '',
    coordinates: [0, 0],
  };

  async getLocationDataByLongAndLat(
    long: number,
    lat: number,
  ): Promise<Location> {
    try {
      if (long && lat) {
        const location = await this.geocoder.reverse(long, lat);
        return {
          name: location[0]?.formattedAddress,
          address: location[0]?.formattedAddress,
          city: location[0]?.city,
          country: location[0]?.country,
          countryCode: location[0]?.countryCode,
          coordinates: [location[0]?.longitude, location[0]?.latitude],
        };
      }
    } catch (error) {
      this.logger.error('getLocationDataByLongAndLat error: \n %o', error);
    }
  }

  async getLocationDataByIpAddress(ipAddress): Promise<Location> {
    if (!ipAddress) {
      return LocationUtil.emptyState;
    }

    const locationUrl = `${process.env.LOCATION_URL?.replace(
      '{ip_address}',
      ipAddress,
    )}/${process.env.LOCATION_URL_QUERY?.replace(
      '{api_key}',
      process.env.IP_API_KEY,
    )}`;

    try {
      const locationData = (await RequestUtil.makeGetRequest(locationUrl)).data;

      return {
        name: '',
        address: '',
        city: locationData?.city || '',
        country: locationData?.country_name || '',
        countryCode: locationData?.country_code || '',
        coordinates: [
          locationData?.longitude || 0,
          locationData?.latitude || 0,
        ],
      };
    } catch (error) {
      this.logger.error('getLocationDataByIpAddress error', error);
      return LocationUtil.emptyState;
    }
  }

  async getLocationDataByAddress(location: string): Promise<Location> {
    try {
      const locationData = await this.geocoder.geocode(location);

      this.logger.log(
        'getLocationDataByAddress :: locationData %o',
        JSON.stringify(locationData),
      );

      return {
        name: location,
        address: locationData[0]?.formattedAddress,
        city: locationData[0]?.city,
        country: locationData[0]?.country,
        countryCode: locationData[0]?.countryCode,
        streetNumber: locationData[0]?.streetNumber,
        streetName: locationData[0]?.streetName,
        state:
          locationData[0]?.administrativeLevels?.level1long ||
          locationData[0]?.city,
        zip: locationData[0]?.zipcode,
        coordinates: [locationData[0]?.longitude, locationData[0]?.latitude],
        administrativeLevels: locationData.map((loc) => {
          return {
            ...loc.administrativeLevels,
            neighborhood: loc.extra?.neighborhood,
          };
        }),
      };
    } catch (error) {
      this.logger.error('getLocationDataByAddress error: \n %o', error);
      return LocationUtil.emptyState;
    }
  }
}
