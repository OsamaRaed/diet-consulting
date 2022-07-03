import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Answer} from "./answer.model";


export const AnswerProvider = [
    {
        provide: ProvidersEnum.ANSWER,
        useValue: Answer,
    }
];