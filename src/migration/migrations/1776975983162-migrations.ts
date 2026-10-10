import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1776975983162 implements MigrationInterface {
    name = 'Migrations1776975983162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "registration" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "reason_for_application" text,
                "preregistration_question_id" uuid,
                "program_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "transaction_id" uuid,
                CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bbaf2c600e9828dad91a58d158" ON "registration" ("preregistration_question_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1fdd13df5a0df075a1ed740b49" ON "registration" ("program_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7df145ec10b504c38049e3253d" ON "registration" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a1f0054785f50c59691cd4bcc1" ON "registration" ("transaction_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "full_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "linked_in_profile" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "job_title" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "min_year_of_experience" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "max_year_of_experience" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "type_of_organization" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "specializations" text
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ADD "fee" numeric
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ADD "program_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD "selected_option_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD "program_id" uuid NOT NULL
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
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "webhook_response"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"
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
            ALTER TABLE "vda_reversal_failure_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "vda_reversal_failure_log"
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
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
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
            ALTER TABLE "pre_registration_option" DROP CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_05a378be19a34c58d23d112cd08"
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
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP COLUMN "response"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD "response" text
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
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
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
            CREATE INDEX "IDX_2a17ea365c735206830cfec6cb" ON "pre_registration_question" ("program_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_15cc3fc4d4ac0eaf28c801905b" ON "pre_registration_response" ("program_id")
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
            ALTER TABLE "notification"
            ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"
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
            DROP INDEX "public"."IDX_15cc3fc4d4ac0eaf28c801905b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2a17ea365c735206830cfec6cb"
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
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dynamic_virtual_account"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
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
            ALTER TABLE "pre_registration_response" DROP COLUMN "response"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD "response" character varying NOT NULL
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
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
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
            ALTER TABLE "program"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "program"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
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
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction_error_log"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
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
            ALTER TABLE "user"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "notification"
            ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response"
            ADD CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "virtual_account_error_log"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP COLUMN "program_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP COLUMN "selected_option_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_question" DROP COLUMN "program_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "program" DROP COLUMN "fee"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "specializations"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "type_of_organization"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "max_year_of_experience"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "min_year_of_experience"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "job_title"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "linked_in_profile"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "full_name"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a1f0054785f50c59691cd4bcc1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7df145ec10b504c38049e3253d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1fdd13df5a0df075a1ed740b49"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bbaf2c600e9828dad91a58d158"
        `);
        await queryRunner.query(`
            DROP TABLE "registration"
        `);
    }

}
