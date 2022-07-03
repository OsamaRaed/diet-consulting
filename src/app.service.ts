import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {UserService} from "./modules/user/user.service";
import {QuestionService} from "./modules/question/question.service";

@Injectable()
export class AppService {

    constructor(
        private readonly questionService: QuestionService,
        private readonly userService: UserService,
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    generateFakeData(dataSize: number) {
        for (let i = 0; i <= dataSize; i++) {
            const title = faker.lorem.sentence();
            const description = faker.lorem.sentence();
            const data = {
                title: title,
                description: description,
            };
            this.questionService.createQuestion(data, 2 + "");
        }
    }
}