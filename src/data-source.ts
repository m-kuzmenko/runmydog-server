import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { readFileSync} from "node:fs";
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "rc1a-9xvahu8how78avs4.mdb.yandexcloud.net",
    port: 6432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "runMyDog",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
        ca: readFileSync("/Users/mpkuzmenko/.postgresql/root.crt").toString()
    }
})
