import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {

                const dbname = configService.get("DB_Name");
                const hostname = configService.get("Host_Name");
                const dbport = configService.get("DB_Port");
                const dbservice = configService.get("DB_Service");

                const uri = `${dbservice}://${hostname}:${dbport}/${dbname}`

                return { uri }

            }
        })
    ],
    exports: [DatabaseModule]
})
export class DatabaseModule {

}