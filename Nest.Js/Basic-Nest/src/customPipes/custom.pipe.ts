import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TrimAndValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        console.log(metadata, metadata.type, metadata.data, metadata.metatype, value)

        const { data: iskeygiven } = metadata;

        if (iskeygiven) {
            value = value;
        } else {
            value = value["desc"]
        }

        if (typeof value == 'string') {
            value = value.trim()
        }

        if (metadata.type == 'param' && value.length <= 0) {
            throw new BadRequestException("Invalid data")
        }

        if (metadata.type == 'body' && value.length <= 2 || value.length >= 50) {
            throw new BadRequestException("Invalid data")
        }

        return value
    }
}