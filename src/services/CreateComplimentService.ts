import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message
    }: IComplimentRequest) {
        const complimentsRespositories = getCustomRepository(
            ComplimentsRepositories
        );

        const usersRespositories = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect user receiver");
        }

        const userReceiverExists = await usersRespositories.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User receiver does not exists!");
        }

        const compliment = complimentsRespositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRespositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };