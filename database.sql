
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "admin" (
  "id" SERIAL PRIMARY KEY, 
  "username" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "level" INT
  );
  
CREATE TABLE "admin_contact"(
  "id" SERIAL PRIMARY KEY,
  "admin_id" INT REFERENCES "admin",
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "title" VARCHAR,
  "organization" VARCHAR,
  "phone_number" VARCHAR,
  "email_address" VARCHAR,
  "street_address" VARCHAR,
  "street_address2" VARCHAR,
  "city" VARCHAR,
  "state" VARCHAR,
  "zipcode" INT
);

CREATE TABLE "participant" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR,
  "last_name" VARCHAR,
  "admin_id" INT REFERENCES "admin",
  "age" INT,
  "gender" VARCHAR,
  "category" VARCHAR,
  "state" VARCHAR,
  "email" VARCHAR,
  "phone_number" VARCHAR
);

CREATE TABLE "offender_system" (
  "id" SERIAL PRIMARY KEY,
  "system" VARCHAR
);

CREATE TABLE "offender_population" (
  "id" SERIAL PRIMARY KEY,
  "population" VARCHAR
);

CREATE TABLE "offender" (
  "id" SERIAL PRIMARY KEY,
  "participant_id" INT REFERENCES "participant",
  "offender_system_id" INT REFERENCES "offender_system",
  "system_id" INT,
  "violent_offender" BOOLEAN,
  "felon" BOOLEAN,
  "population_id" INT REFERENCES "offender_population"
);

CREATE TABLE "value" (
  "id" SERIAL PRIMARY KEY,
  "values" VARCHAR
);

CREATE TABLE "result" (
  "id" SERIAL PRIMARY KEY,
  "dates" VARCHAR,
  "participant_id" INT REFERENCES "participant",
  "percent_core" INT,
  "percent_violators" INT
);

CREATE TABLE "result_round" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "elimination_round" INT,
  "times" VARCHAR,
);

CREATE TABLE "result_elimination" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value",
  "order" INT
);

CREATE TABLE "result_core" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value",
  "ranks" INT 
);

CREATE TABLE "result_belief" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "belief" VARCHAR,
  "challenged" VARCHAR,
  "type" VARCHAR
);

CREATE TABLE "result_violators"(
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value"
);

CREATE TABLE "url" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(20),
  "expiration_date" DATE,
  "participant_id" INT REFERENCES "participant",
  "admin_id" INT REFERENCES "admin"
);

CREATE TABLE "category" (
"id" SERIAL PRIMARY KEY,
"category" VARCHAR(50)
);

INSERT INTO "category" ("category")
VALUES ('Offender'), ('General Public'), ('Student'), ('Other');

INSERT INTO "value" ("values")
VALUES ('Accountability'), ('Adventure'), ('Being Right'), ('Communication'), ('Community'), 
('Compassion'), ('Confidentiality'), ('Control'), ('Courage'), ('Creativity'), ('Diversity'), 
('Empathy'), ('Flexibility'), ('Forgiveness'), ('Fun'), ('Greed'), ('Happiness'), ('Humor'), 
('Independence'), ('Instant Gratification'), ('Integrity'), ('Justice'), ('Loyalty'), ('Money'), 
('Nonjudgmental'), ('Order'), ('Patience'), ('Perfection'), ('Persistence'), ('Power'), ('Privacy'), 
('Relationships'), ('Respect'), ('Security'), ('Status'), ('Structure'), ('Transparency'), ('Wellness');

INSERT INTO "offender_system" ("system")
VALUES ('State Prison'), ('Federal Prison'), ('DAIP'), ('Juvenile System');

INSERT INTO "offender_population" ("population")
VALUES ('General Population'), ('Release'), ('Parole'), ('Other Program');