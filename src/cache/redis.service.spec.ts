import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';

describe('RedisService', () => {
  let service: RedisService;

  const mockCache: Partial<Cache> = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockRedis: Partial<Redis> = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    zrevrange: jest.fn(),
    zrevrank: jest.fn(),
    zadd: jest.fn(),
    expire: jest.fn(),
    quit: jest.fn(),
  };

  const mockReflector: Partial<Reflector> = {
    get: jest.fn(),
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'REDIS_CLIENT',
          useValue: mockCache,
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: mockRedis,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
