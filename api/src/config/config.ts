import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    PORT: number | undefined,
    SALT_ROUNDS: number | undefined,
    PG_HOST: string | undefined,
    PG_PORT: number | undefined,
    PG_DB: string | undefined,
    PG_USER: string | undefined,
    PG_PW: string | undefined,
}

interface Config {
    PORT: number,
    SALT_ROUNDS: number,
    PG_HOST: string,
    PG_PORT: number,
    PG_DB: string,
    PG_USER: string,
    PG_PW: string,
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_DB: process.env.PG_DB,
    PG_USER: process.env.PG_USER,
    PG_PW: process.env.PG_PW,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitisedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Config Error: Missing ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getSanitisedConfig(getConfig());

export default config;