namespace NodeJS {
  interface ProcessEnv {
    PORT: number,
    SALT_ROUNDS: number,
    PG_HOST: string,
    PG_PORT: number,
    PG_DB: string,
    PG_USER: string,
    PG_PW: string,
  }
}