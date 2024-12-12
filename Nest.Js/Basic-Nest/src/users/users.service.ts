import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";


@Injectable()
export class UsersService {

    users: CreateUserDto[] = [{ id: 1, name: 'John', isActive: true, email: "john@gmail.com", gender: "M" }]

    createNewUser(user: CreateUserDto): string {
        user.id = this.users.length + 1;
        this.users.push(user);
        console.log(this.users);
        return "New User Added !!"
    }

    getAllUsers(name: string): CreateUserDto[] {
        console.log(this.users);
        if (name) {
            return this.users.filter((u) => u.name === name);
        }
        return this.users;
    }

    getSpecificUser(id: number): CreateUserDto {
        console.log(this.users);
        // if (params.id && params.isActive) {
        //     return this.users.find((u) => u.id === +params.id && u.isActive === Boolean(params.isActive))
        // }
        return this.users.find((user) => user.id === id)
    }

}