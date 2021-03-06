import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
    async excute() {
        const tagsRespositories = getCustomRepository(TagsRepositories);
        const tags = await tagsRespositories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService };