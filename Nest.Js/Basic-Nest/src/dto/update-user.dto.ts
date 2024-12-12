import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// It inherits all the properties from Createuserdto and make them optional as well without repeating them and also apply the validation as well. 

export class UpdateUserDto extends PartialType(CreateUserDto) { }