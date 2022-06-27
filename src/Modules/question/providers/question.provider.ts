import {PROVIDERS} from "../../../common/enums/providers";
import {Question} from "../question.model";


export const QuestionProvider = [
    {
        provide: PROVIDERS.QUESTION,
        useValue: Question,
    },
];
