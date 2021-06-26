import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSenderComplimentsService {
    async execute(user_id: string) {
        const complimentsRespositories = getCustomRepository(
            ComplimentsRepositories
        );

        const compliments = await complimentsRespositories.find({
            where: {
                user_sender: user_id,
            }
        });
        return compliments;
    }
}

export { ListUserSenderComplimentsService };