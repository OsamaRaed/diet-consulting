import {
    Body,
    Controller,
    Request,
    Post,
    UseGuards,
    Get,
    Query,
    ParseIntPipe, Param
} from "@nestjs/common";
import {QuestionService} from "./providers/question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {AuthGuard} from "../../common/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("questions")
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {
    }

    @Post()
    async addQuestion(@Request() req, @Body() body: CreateQuestionDto) {
        return this.questionService.createQuestion(body, req.user.id);
    }

    @Get()
    async getQuestions(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.questionService.getQuestions(limit, offset);
    }


    @Get(':id')
    async getOneQuestion(@Param('id') id: string) {
        return this.questionService.getOneQuestion(id);
    }
}
