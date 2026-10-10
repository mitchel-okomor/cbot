import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1776954649898 implements MigrationInterface {
    name = 'Migrations1776954649898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "webhook_response" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "event" character varying,
                "reference" character varying,
                "identifier" character varying,
                "response" text,
                "payment_mode" character varying,
                "amount" numeric(12, 2),
                "status" character varying,
                "provider" character varying,
                "currency" character varying,
                CONSTRAINT "UQ_da901ecb85b24f45370b0699a92" UNIQUE ("reference"),
                CONSTRAINT "PK_0615f010775c1e3d8f6ba663f92" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_403bf9b3ba07be5648a4e81e92" ON "webhook_response" ("event")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_da901ecb85b24f45370b0699a9" ON "webhook_response" ("reference")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_821a64e7fc32fad0a042b7f3c1" ON "webhook_response" ("identifier")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_44e8059220408bb0f40202a65c" ON "webhook_response" ("payment_mode")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e0275644e27535416436e2226d" ON "webhook_response" ("amount")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8ff05fc153f1181e9fc9a0a21a" ON "webhook_response" ("status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9af37911f18b6a8d3d574a1932" ON "webhook_response" ("provider")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f9de6e9d6d3884b1bc7bbb0407" ON "webhook_response" ("currency")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."transaction_status_enum" AS ENUM('00', '99', '03', '04', '91', '92', '95', '96')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."transaction_payment_method_enum" AS ENUM('PAYMENTLINK', 'TRANSFER')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."transaction_processor_enum" AS ENUM('PAYSTACK', 'FLUTTERWAVE', 'STRIPE')
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "amount" numeric(12, 2) NOT NULL,
                "currency" text NOT NULL,
                "reference" character varying NOT NULL,
                "request" text,
                "response" text,
                "status" "public"."transaction_status_enum" NOT NULL,
                "payment_method" "public"."transaction_payment_method_enum" NOT NULL,
                "processor" "public"."transaction_processor_enum" NOT NULL,
                "meta" text,
                CONSTRAINT "UQ_0b12a144bdc7678b6ddb0b913fc" UNIQUE ("reference"),
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "virtual_account_error_log" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "amount" numeric(12, 2),
                "session_id" character varying,
                "reference" character varying,
                "reason" character varying,
                "retries" integer NOT NULL DEFAULT '0',
                "data" text,
                "error" text,
                "provider" character varying,
                "account_number" character varying,
                CONSTRAINT "PK_e91629cab94051ae22ad910a939" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2eb8c87472484d98fd2c8ee378" ON "virtual_account_error_log" ("amount")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_36d3b0d2557db4ad4f32222604" ON "virtual_account_error_log" ("session_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_998565879a662e9e143a0da22c" ON "virtual_account_error_log" ("reference")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_866a1cb93c70ca3f45845b6873" ON "virtual_account_error_log" ("reason")
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction_error_log" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "amount" numeric(12, 2),
                "tnx_id" character varying,
                "reference" character varying NOT NULL,
                "reason" character varying,
                "retries" integer NOT NULL DEFAULT '0',
                "data" text,
                "error" text,
                "processor" text,
                CONSTRAINT "UQ_332ae184b854c2c536843469f11" UNIQUE ("reference"),
                CONSTRAINT "PK_e351282c07ec7ee1543c4bf8504" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f390d0a76ea8c374496b8accba" ON "transaction_error_log" ("amount")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c75e3d231ce585e675af77588a" ON "transaction_error_log" ("tnx_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_332ae184b854c2c536843469f1" ON "transaction_error_log" ("reference")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d3c8c75f82a17d199b4225efa9" ON "transaction_error_log" ("reason")
        `);
        await queryRunner.query(`
            CREATE TABLE "vda_reversal_failure_log" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "reference" character varying NOT NULL,
                "data" text,
                "error" text,
                "provider" character varying,
                CONSTRAINT "PK_b78c562d6c7d76a76674dba5392" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_668dbe8806ce869efc028235d0" ON "vda_reversal_failure_log" ("reference")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."virtual_account_inflow_status_enum" AS ENUM('00', '99', '03', '04', '91', '92', '95', '96')
        `);
        await queryRunner.query(`
            CREATE TABLE "virtual_account_inflow" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "account_number" character varying NOT NULL,
                "reference" character varying NOT NULL,
                "client_reference" character varying NOT NULL,
                "amount" numeric(12, 2) NOT NULL,
                "settled_amount" numeric(12, 2) NOT NULL DEFAULT '0',
                "processing_fee" numeric(12, 2) NOT NULL DEFAULT '0',
                "currency" character varying,
                "processor" character varying,
                "response" text,
                "status" "public"."virtual_account_inflow_status_enum" NOT NULL DEFAULT '00',
                "reversal_request" text,
                "reversal_response" text,
                CONSTRAINT "UQ_651792611ded093707e80ea3526" UNIQUE ("reference"),
                CONSTRAINT "UQ_4db256dc88d489e711539db9801" UNIQUE ("client_reference"),
                CONSTRAINT "PK_1e333c383b2f60b0c225b9e1a25" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "program" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "image" character varying,
                "is_active" boolean NOT NULL DEFAULT true,
                "start_time" TIMESTAMP,
                "end_time" TIMESTAMP,
                CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pre_registration_option" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "content" character varying NOT NULL,
                "preregistration_question_id" uuid NOT NULL,
                CONSTRAINT "PK_44c62f6b6acb6363d035507fbea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_09bf69004447ef8ba3a6a1e730" ON "pre_registration_option" ("preregistration_question_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "pre_registration_question" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "content" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'SINGLE_OPTION',
                CONSTRAINT "PK_20fa7a49ffb59ab8b0f98dd7a8b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_gender_enum" AS ENUM('MALE', 'FEMALE')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "first_name" character varying,
                "last_name" character varying,
                "email" character varying NOT NULL,
                "phone_number" character varying,
                "gender" "public"."user_gender_enum",
                "dob" TIMESTAMP,
                "bio" character varying,
                "address" character varying,
                "email_verified_at" TIMESTAMP,
                "player_id" character varying,
                "image_url" character varying,
                "password" character varying,
                "skip_tour" boolean NOT NULL DEFAULT false,
                "is_active" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE TABLE "pre_registration_response" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "response" character varying NOT NULL,
                "preregistration_question_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_53ac0e9c14c2aa4e61ee16ff4e8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_05a378be19a34c58d23d112cd0" ON "pre_registration_response" ("preregistration_question_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0fa3d03fc8516f9d9f9dca934f" ON "pre_registration_response" ("user_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "notification" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "action" character varying NOT NULL,
                "message" character varying NOT NULL,
                "sender_id" character varying NOT NULL,
                "is_read" boolean NOT NULL DEFAULT false,
                "type" character varying NOT NULL DEFAULT 'UNKNOWN',
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_928b7aa1754e08e1ed7052cb9d" ON "notification" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c321907ba8a8e2140c30e14593" ON "notification" ("user_id", "type")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_af4870a2f8b5443a1fe1aecd4c" ON "notification" ("user_id", "is_read")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dynamic_virtual_account_provider_enum" AS ENUM('CONSISTENT_TRUST', 'PROVIDUS', 'WEMA')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dynamic_virtual_account_status_enum" AS ENUM('00', '99', '03', '04', '91', '92', '95', '96')
        `);
        await queryRunner.query(`
            CREATE TABLE "dynamic_virtual_account" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "account_number" text NOT NULL,
                "account_name" text NOT NULL,
                "trace_ref" character varying NOT NULL,
                "email" character varying,
                "phone_number" character varying,
                "currency" text NOT NULL,
                "provider" "public"."dynamic_virtual_account_provider_enum" NOT NULL,
                "client_request" character varying,
                "provider_response" character varying,
                "issuing_bank" text,
                "meta" text,
                "expires_at" TIMESTAMP WITH TIME ZONE,
                "fulfillment_status" character varying NOT NULL DEFAULT 'pending',
                "fulfillment_response" character varying,
                "fulfillment_time" TIMESTAMP,
                "fulfillment_amount" numeric,
                "status" "public"."dynamic_virtual_account_status_enum" NOT NULL DEFAULT '00',
                "reversal_request" text,
                "reversal_response" text,
                CONSTRAINT "PK_2b6f94c44879b66f9a52df3f479" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "analytics" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "type" character varying NOT NULL,
                "data" json,
                CONSTRAINT "PK_3c96dcbf1e4c57ea9e0c3144bff" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."admin_role_enum" AS ENUM('EMPLOYEE', 'ADMIN')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."admin_gender_enum" AS ENUM('MALE', 'FEMALE')
        `);
        await queryRunner.query(`
            CREATE TABLE "admin" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "deleted_by" uuid,
                "updated_by" uuid,
                "email" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                "role" "public"."admin_role_enum" NOT NULL DEFAULT 'EMPLOYEE',
                "gender" "public"."admin_gender_enum",
                "dob" TIMESTAMP,
                "first_name" character varying,
                "last_name" character varying,
                "email_verified_at" TIMESTAMP,
                "image_url" character varying,
                "password" character varying,
                CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"),
                CONSTRAINT "UQ_507a8d628bffdc921274fc155f8" UNIQUE ("phone_number"),
                CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option"
            ADD CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306" FOREIGN KEY ("preregistration_question_id") REFERENCES "pre_registration_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "notification"
            ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_0fa3d03fc8516f9d9f9dca934fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_response" DROP CONSTRAINT "FK_05a378be19a34c58d23d112cd08"
        `);
        await queryRunner.query(`
            ALTER TABLE "pre_registration_option" DROP CONSTRAINT "FK_09bf69004447ef8ba3a6a1e7306"
        `);
        await queryRunner.query(`
            DROP TABLE "admin"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."admin_gender_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."admin_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "analytics"
        `);
        await queryRunner.query(`
            DROP TABLE "dynamic_virtual_account"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dynamic_virtual_account_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dynamic_virtual_account_provider_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_af4870a2f8b5443a1fe1aecd4c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c321907ba8a8e2140c30e14593"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_928b7aa1754e08e1ed7052cb9d"
        `);
        await queryRunner.query(`
            DROP TABLE "notification"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0fa3d03fc8516f9d9f9dca934f"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_05a378be19a34c58d23d112cd0"
        `);
        await queryRunner.query(`
            DROP TABLE "pre_registration_response"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_gender_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "pre_registration_question"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_09bf69004447ef8ba3a6a1e730"
        `);
        await queryRunner.query(`
            DROP TABLE "pre_registration_option"
        `);
        await queryRunner.query(`
            DROP TABLE "program"
        `);
        await queryRunner.query(`
            DROP TABLE "virtual_account_inflow"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."virtual_account_inflow_status_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_668dbe8806ce869efc028235d0"
        `);
        await queryRunner.query(`
            DROP TABLE "vda_reversal_failure_log"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3c8c75f82a17d199b4225efa9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_332ae184b854c2c536843469f1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c75e3d231ce585e675af77588a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f390d0a76ea8c374496b8accba"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction_error_log"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_866a1cb93c70ca3f45845b6873"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_998565879a662e9e143a0da22c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_36d3b0d2557db4ad4f32222604"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2eb8c87472484d98fd2c8ee378"
        `);
        await queryRunner.query(`
            DROP TABLE "virtual_account_error_log"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."transaction_processor_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."transaction_payment_method_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."transaction_status_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f9de6e9d6d3884b1bc7bbb0407"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9af37911f18b6a8d3d574a1932"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8ff05fc153f1181e9fc9a0a21a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e0275644e27535416436e2226d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_44e8059220408bb0f40202a65c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_821a64e7fc32fad0a042b7f3c1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_da901ecb85b24f45370b0699a9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_403bf9b3ba07be5648a4e81e92"
        `);
        await queryRunner.query(`
            DROP TABLE "webhook_response"
        `);
    }

}
