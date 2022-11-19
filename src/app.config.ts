export default {
    PostgresServer: process.env.PG_SERVER ?? '',
    PostgresUser: process.env.PG_USER ?? '',
    PostgresPassword: process.env.PG_PASS ?? '',
    PostgresDatabase: process.env.PG_DB ?? '',
    PostgresPort: process.env.PG_PORT ?? '',
    JwtKey: process.env.JWT_KEY ?? ''
}