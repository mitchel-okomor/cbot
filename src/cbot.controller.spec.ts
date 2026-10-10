import { Test, TestingModule } from "@nestjs/testing";
import { CbotController } from "./cbot.controller";
import { CbotService } from "./cbot.service";
import { ConfigService } from "@nestjs/config";

describe("CbotController", () => {
  let harmonyController: CbotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CbotController],
      providers: [
        CbotService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("test"),
          },
        },
      ],
    }).compile();

    harmonyController = app.get<CbotController>(CbotController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(harmonyController.getHello()).toBe("cbot service running in test");
    });
  });
});
