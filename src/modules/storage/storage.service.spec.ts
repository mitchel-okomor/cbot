import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import { GenericProviderFactory } from '../factory/provider-factory';

describe('StorageService', () => {
  let service: StorageService;

  const mockGenericProviderFactory = {
    resolveStorageProvider: jest.fn().mockReturnValue({
      upload: jest.fn(),
      deleteResource: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: GenericProviderFactory,
          useValue: mockGenericProviderFactory,
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
