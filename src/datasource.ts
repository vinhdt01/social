import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql-db",
    port: Number(process.env.DBMYSQL_DOCKER_PORT) ?? 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
})