import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1785301617911 implements MigrationInterface {
    name = 'Migrations1785301617911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "discount" numeric(12, 2) NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_7df145ec10b504c38049e3253d4"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_42f0935cc814e694ed0e61fdece"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_1df07d724efea4150dd7ab8cb7a"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_a1f0054785f50c59691cd4bcc11"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_8273b22dec452dfb915ad8d1c08"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_inflow"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_inflow"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "vda_reversal_failure_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "vda_reversal_failure_log"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question" DROP CONSTRAINT "FK_2a17ea365c735206830cfec6cbd"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_15cc3fc4d4ac0eaf28c801905b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_1fdd13df5a0df075a1ed740b49a"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_1dac796ab976a14659f700ee4a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_f2f3d351db790e445ed47b33d8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_4b826ee8bec4cbf1ae8fd88c28d"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option" DROP CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_05a378be19a34c58d23d112cd08"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_bbaf2c600e9828dad91a58d1589"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "certificate"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "certificate"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_dd564b8d8d855b69cefc102ea93"
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "analytics"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "analytics"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "admin"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "admin"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ADD CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ADD CONSTRAINT "FK_2a17ea365c735206830cfec6cbd" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_bbaf2c600e9828dad91a58d1589" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_1fdd13df5a0df075a1ed740b49a" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_7df145ec10b504c38049e3253d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_a1f0054785f50c59691cd4bcc11" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_05a378be19a34c58d23d112cd08" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_4b826ee8bec4cbf1ae8fd88c28d" FOREIGN KEY ("selected_option_id") REFERENCES "pre_registration_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_15cc3fc4d4ac0eaf28c801905b5" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_1dac796ab976a14659f700ee4a9" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_42f0935cc814e694ed0e61fdece" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_8273b22dec452dfb915ad8d1c08" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_f2f3d351db790e445ed47b33d8d" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_1df07d724efea4150dd7ab8cb7a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_dd564b8d8d855b69cefc102ea93" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_dd564b8d8d855b69cefc102ea93"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_1df07d724efea4150dd7ab8cb7a"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response" DROP CONSTRAINT "FK_f2f3d351db790e445ed47b33d8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_8273b22dec452dfb915ad8d1c08"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_42f0935cc814e694ed0e61fdece"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_1dac796ab976a14659f700ee4a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_15cc3fc4d4ac0eaf28c801905b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_4b826ee8bec4cbf1ae8fd88c28d"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_05a378be19a34c58d23d112cd08"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_a1f0054785f50c59691cd4bcc11"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_7df145ec10b504c38049e3253d4"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_1fdd13df5a0df075a1ed740b49a"
        `);
        await queryRunner.query(`
            ALTER TABLE "registration" DROP CONSTRAINT "FK_bbaf2c600e9828dad91a58d1589"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question" DROP CONSTRAINT "FK_2a17ea365c735206830cfec6cbd"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option" DROP CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306"
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "admin"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "admin"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "analytics"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "analytics"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_dd564b8d8d855b69cefc102ea93" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "certificate"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "certificate"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_bbaf2c600e9828dad91a58d1589" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_05a378be19a34c58d23d112cd08" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ADD CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_4b826ee8bec4cbf1ae8fd88c28d" FOREIGN KEY ("selected_option_id") REFERENCES "pre_registration_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_f2f3d351db790e445ed47b33d8d" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_1dac796ab976a14659f700ee4a9" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_1fdd13df5a0df075a1ed740b49a" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_15cc3fc4d4ac0eaf28c801905b5" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ADD CONSTRAINT "FK_2a17ea365c735206830cfec6cbd" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vda_reversal_failure_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "vda_reversal_failure_log"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_inflow"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_inflow"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_8273b22dec452dfb915ad8d1c08" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_a1f0054785f50c59691cd4bcc11" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "application_response"
            ADD CONSTRAINT "FK_1df07d724efea4150dd7ab8cb7a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_42f0935cc814e694ed0e61fdece" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "registration"
            ADD CONSTRAINT "FK_7df145ec10b504c38049e3253d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "discount"
        `);
    }

}
