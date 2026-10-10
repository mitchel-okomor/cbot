import { Inject, forwardRef } from '@nestjs/common';
import { RedisService } from 'src/cache';
import { PAYMENT_PROVIDER, PAYMENT_STATUS } from 'src/enums/payment.enum';
import { CacheUtil } from 'src/utils';
const crypto = require('node:crypto');


export default abstract class AbstractPaymentProvider {
  paystack_transfer_failure_count = 0;

  @Inject(forwardRef(() => RedisService))
  private readonly redisProvider: RedisService;

  protected abstract getRefPrefix(): string;

  decryptSensitiveKeys(clientId: string, encryptedData: string): any {
    const encAesKey = clientId?.substring(0, 32);
    const encAesIv = clientId?.substring(0, 16);

    const iv = Buffer.from(encAesIv, 'utf-8');
    const key = Buffer.from(encAesKey, 'utf-8');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key.toString(), iv.toString());
    let decrypted = decipher.update(encryptedData, 'base64');
    decrypted += decipher.final();
    return decrypted;
  }

  async trackTransferFailure(provider: PAYMENT_PROVIDER, status: PAYMENT_STATUS, error?: any): Promise<void> {
    //TODO - expecting the variable name to exist is not clean code.
    let trackerName = `${provider?.toLowerCase()}_transfer_failure_count`;
    console.log('Transfer Failure :: trackerName %s', trackerName);
    try {
      if (status == PAYMENT_STATUS.SUCCESS) {
        this[trackerName] = 0;
      } else if (status != PAYMENT_STATUS.PENDING) {
        this[trackerName] += 1;
        await this.redisProvider.updateKeyByIncrement(CacheUtil.getProviderFailureCountToday(provider), 1);
      }

      console.log(`${trackerName} %s`, this[trackerName]);

      if (this[trackerName] >= 5 && this[trackerName] % 5 == 0) {
        const providerFailureCountToday = await this.redisProvider.getData(
          CacheUtil.getProviderFailureCountToday(provider)
        );
        console.log(`${trackerName} %s`, this[trackerName]);
      }
    } catch (error) {
      console.log('AbstractPaymentProvider :: trackTransferFailure error \n %o', error);
    }
  }
}
