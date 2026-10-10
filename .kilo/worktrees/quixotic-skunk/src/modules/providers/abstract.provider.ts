import {
  ProviderCredentialFactory,
  ProviderCredentialValidator,
} from '../../interfaces/providers/provider-config.interface';

export abstract class AbstractProvider {
  abstract getConfigurationRequirement(): ProviderCredentialValidator;

  abstract instantiateProvider(credentials?: ProviderCredentialFactory): this;

  validateConfigurationRequirement(
    credentials: ProviderCredentialFactory,
  ): void {
    const validator = this.getConfigurationRequirement();

    for (const key in validator) {
      if (
        validator[key as keyof ProviderCredentialValidator] &&
        !credentials[key as keyof ProviderCredentialFactory]
      ) {
        throw new Error(`Key ${key} missing for ${AbstractProvider.name}`);
      }
    }
  }
}
