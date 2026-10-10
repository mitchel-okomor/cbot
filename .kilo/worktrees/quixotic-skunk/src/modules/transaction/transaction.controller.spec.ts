import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repository/transaction.repository';
import { GenericProviderFactory } from '../factory/provider-factory';
import { RedisService } from 'src/cache';

describe('TransactionController', () => {
  let controller: TransactionController;

  const mockTransactionRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockGenericProviderFactory = {
    getPaymentLinkProvider: jest.fn(),
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: mockTransactionRepository,
        },
        {
          provide: GenericProviderFactory,
          useValue: mockGenericProviderFactory,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
