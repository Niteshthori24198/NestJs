import { Module } from "@nestjs/common";
import { FactoryController } from "./fp.controller";
import { A, B, EnvConfig } from "./fp";

@Module({
    controllers: [FactoryController],
    providers: [
        {
            provide: 'Data_Type',
            useFactory: (envConfig: EnvConfig, data: number[] = []) => {
                const data_type = envConfig.envTpye === "PROD" ? new A(data) : new B();

                return data_type
            },
            inject: [EnvConfig, { token: 'data', optional: true }],
        },
        EnvConfig,
        {
            provide: 'data',
            useValue: [1, 2, 3]
        }
    ]
})
export class FactoryProvider {

}