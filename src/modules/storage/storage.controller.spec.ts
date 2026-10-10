import { Test, TestingModule } from '@nestjs/testing';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { GenericProviderFactory } from '../factory/provider-factory';

describe('StorageController', () => {
  let controller: StorageController;

  const mockGenericProviderFactory = {
    resolveStorageProvider: jest.fn().mockReturnValue({
      upload: jest.fn(),
      deleteResource: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController],
      providers: [
        StorageService,
        {
          provide: GenericProviderFactory,
          useValue: mockGenericProviderFactory,
        },
      ],
    }).compile();

    controller = module.get<StorageController>(StorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
