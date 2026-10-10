import { Injectable, Logger } from '@nestjs/common';
import { IEmailData } from 'src/interfaces';
import { CommonUtil } from 'src/utils';
import { GenericProviderFactory } from 'src/modules/factory/provider-factory';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);

  constructor(
    private readonly genericProviderFactory: GenericProviderFactory,
    private readonly configService: ConfigService,
  ) {}

  async sendOneEmail(data: IEmailData) {
    try {
      const provider = this.genericProviderFactory.resolveEmailProvider();

      const emailProviderRResponse = await provider.sendOneMail({
        ...data,
        htmlOrTemplate: data.html,
        email: data.to,
        htmlOrTemplateId: data.html,
      });
      console.log('emailProviderResponse: ', emailProviderRResponse);
      return emailProviderRResponse;
    } catch (error) {
      this.logger.error(
        'AuthNotificationService :: sendOTPEmail error \n %o',
        CommonUtil.getError(error),
      );
      //TODO - requeue ?
    }
  }
}
