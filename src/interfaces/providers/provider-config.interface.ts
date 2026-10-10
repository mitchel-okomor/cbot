export interface ProviderCredentialValidator {
  privateOrSecretKey?: boolean;
  publicKey?: boolean;
  apiKey?: boolean;
  username?: boolean;
  password?: boolean;
}

export interface ProviderCredentialFactory {
  privateOrSecretKey?: string;
  publicKey?: string;
  apiKey?: string;
  username?: string;
  password?: string;
}
