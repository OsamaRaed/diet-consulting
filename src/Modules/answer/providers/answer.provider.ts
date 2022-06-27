import {PROVIDERS} from "../../../common/enums/providers";
import {Answer} from "../answer.model";


export const AnswerProvider = [
    {
        provide: PROVIDERS.ANSWER,
        useValue: Answer,
    }
];