import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';

describe('UsersService', () => {
  let service: UserService;

  const mockUserRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    findOneCache: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    getAuthUserByEmail: jest.fn(),
    getAuthUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
