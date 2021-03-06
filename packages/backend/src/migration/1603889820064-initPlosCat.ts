import { MigrationInterface, QueryRunner } from "typeorm";

export class initPlosCat1603889820064 implements MigrationInterface {
    name = 'initPlosCat1603889820064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modos"."ploscategories" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            category TEXT NOT NULL,
            "weight" REAL NOT NULL DEFAULT 0.0,
            time_weight REAL NOT NULL DEFAULT 1.0,
            CONSTRAINT ploscategories_pkey PRIMARY KEY (id),
            CONSTRAINT check_categories CHECK (category='obstacle' OR category='step' OR category='coating' OR category='security' OR category='slope' OR category='width' OR category='other-negative' OR category='positive'),
            CONSTRAINT check_weight CHECK (weight <=1 AND weight>=0),
            CONSTRAINT check_time_weight CHECK (time_weight <=1 AND time_weight>=0)
        );`, undefined);

        await queryRunner.query(`INSERT INTO "modos"."ploscategories" (category) VALUES ('obstacle'), ('step'), ('coating'), ('security'), ('slope'), ('width'), ('other-negative'), ('positive');`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."impacts" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            impact_name TEXT NOT NULL,
            CONSTRAINT impact_pkey PRIMARY KEY (id),
            CONSTRAINT check_impact_name CHECK (impact_name='low' OR impact_name='mild' OR impact_name='moderate' OR impact_name='high' OR impact_name='critical')
        );`, undefined);

        await queryRunner.query(`INSERT INTO "modos"."impacts" (impact_name) VALUES ('low'), ('mild'), ('moderate'), ('high'), ('critical');`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."descriptions" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            ploscategory_id INT REFERENCES "modos"."ploscategories" (id) NOT NULL,
            impact_id INT REFERENCES "modos"."impacts" (id) NOT NULL,
            freetext CHARACTER VARYING(4096),
            CONSTRAINT descriptions_pkey PRIMARY KEY (id)
        );`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
