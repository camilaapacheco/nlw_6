import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const userRespositories = getCustomRepository(UsersRepositories);

        const user = await userRespositories.findOne({
            email,
        });

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
            {
                email: user.email,
            },
            "f88c8e93be94704698d0f3f6b817b02e",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );
        return token;
    }
}

export { AuthenticateUserService };