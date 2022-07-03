import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Question} from "./question.model";


export const QuestionProvider = [
    {
        provide: ProvidersEnum.QUESTION,
        useValue: Question,
    },
];
