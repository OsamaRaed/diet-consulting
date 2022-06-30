import {
    Body,
    Controller,
    Request,
    Post,
    UseGuards,
    Get,
    Query,
    ParseIntPipe, Param, Put, Delete
} from "@nestjs/common";
import {QuestionService} from "./providers/question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {AuthGuard} from "../../common/guards/auth.guard";
import {Roles} from "../../common/decorators/roles.decorator";
import {ROLES} from "../../common/enums/roles";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiTags('questions')
@Controller("questions")
@ApiBearerAuth()
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {
    }

    @Post()
    @Roles(ROLES.PATIENT)
    async addQuestion(@Request() req, @Body() body: CreateQuestionDto) {
        return this.questionService.createQuestion(body, req.user.id);
    }



    @Get()
    async getQuestions(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Request() req
    ) {
        return this.questionService.getQuestions(limit, offset,req.user.id);
    }


    @Put('/:id')
    @Roles(ROLES.PATIENT)
    async updateQuestion(@Param('id') id: string, @Body() body: CreateQuestionDto, @Request() req) {
        return this.questionService.updateQuestion(id, body, req.user.id);
    }

    @Get(':id')
    async getOneQuestion(@Param('id') id: number) {
        return this.questionService.getOneQuestion(id);
    }

    @Delete(':id')
    @Roles(ROLES.PATIENT)
    async deleteQuestion(@Param('id') id: string, @Request() req) {
        return this.questionService.deleteQuestion(id, req.user.id);
    }
}
