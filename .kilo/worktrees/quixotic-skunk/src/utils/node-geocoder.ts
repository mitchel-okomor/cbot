import { Injectable } from '@nestjs/common';
import * as nodeGeocoder from 'node-geocoder';
import { Geocoder, GoogleOptions } from 'node-geocoder';

@Injectable()
export default class NodeGeocoder {
  private geocoder: Geocoder;

  constructor() {
    const googleOptions: GoogleOptions = {
      provider: 'google',
      apiKey: process.env.GOOGLE_LOCATION_API_KEY,
    };
    this.geocoder = nodeGeocoder(googleOptions);
  }

  async geocode(address: string) {
    return this.geocoder.geocode(address);
  }

  async reverse(long: number, lat: number) {
    return this.geocoder.reverse({ lon: long, lat });
  }
}
