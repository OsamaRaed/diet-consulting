import {Body, Controller, Param, Patch, Post, Request, UseGuards} from "@nestjs/common";
import {AnswerService} from "./providers/answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {AuthGuard} from "../../common/guards/auth.guard";


@UseGuards(AuthGuard)
@Controller("answers")
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
    ) {
    }


    @Post()
    async createRecommendation(@Body() dto: CreateAnswerDto, @Request() req) {
        return await this.answerService.createAnswer(dto, req.user.id);
    }


    @Patch(':id')
    async submitRecommendation(@Param('id') id: string, @Request() req) {
        return await this.answerService.submitAnswer(id, req.user.id);
    }
}