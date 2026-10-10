import { Module } from '@nestjs/common';
import NodeGeocoder from './node-geocoder';
import { LocationUtil } from './location.util';

@Module({
  imports: [],
  providers: [NodeGeocoder, LocationUtil],
  exports: [NodeGeocoder, LocationUtil],
})
export class UtilModule {}
