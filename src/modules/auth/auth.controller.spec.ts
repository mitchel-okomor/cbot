import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/users.service";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";

describe("AuthController", () => {
  let controller: AuthController;

  const mockUserService = {
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
    getUserByPhoneNumber: jest.fn(),
    saveUser: jest.fn(),
    updateUserProfile: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
    getOrThrow: jest.fn().mockImplementation((key: string) => {
      const values: Record<string, string> = {
        JWT_SECRET: "test-secret",
        JWT_EXPIRES_IN: "1h",
        WEB_APP_BASE_URL: "http://localhost:3000",
      };
      return values[key];
    }),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
