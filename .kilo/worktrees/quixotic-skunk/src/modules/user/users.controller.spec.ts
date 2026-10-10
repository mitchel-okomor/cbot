import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repository/user.repository';

describe('UsersController', () => {
  let controller: UsersController;

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
      controllers: [UsersController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
