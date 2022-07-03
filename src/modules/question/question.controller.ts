import {
    Body,
    Controller,
    Post,
    UseGuards,
    Get,
    Query,
    ParseIntPipe, Param, Put, Delete, UseInterceptors, Patch
} from "@nestjs/common";
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {AuthGuard} from "../../common/guards/auth.guard";
import {Roles} from "../../common/decorators/roles.decorator";
import {ROLES} from "../../common/enums/roles";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {UpdateQuestionDto} from "./dto/update-question.dto";

@UseGuards(AuthGuard)
@ApiTags('questions')
@Controller("questions")
// @UseInterceptors(TransactionInterceptor)
@ApiBearerAuth()
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {
    }

    @Post()
    @Roles(ROLES.PATIENT)
    async addQuestion(@UserIdentity() user: IUserIdentity, @Body() body: CreateQuestionDto) {
        return this.questionService.createQuestion(body, user.id);
    }


    @Get()
    async getQuestions(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number,
        @UserIdentity() user: IUserIdentity
    ) {
        return this.questionService.getQuestions(limit, offset, user.id);
    }


    @Patch('/:id')
    @Roles(ROLES.PATIENT)
    async updateQuestion(
        @Param('id') id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
        @UserIdentity() user: IUserIdentity) {
        return this.questionService.updateQuestion(id, updateQuestionDto, user.id);
    }

    @Get(':id')
    async getOneQuestion(@Param('id') id: number) {
        return this.questionService.getOneQuestion(id);
    }

    @Delete(':id')
    @Roles(ROLES.PATIENT)
    async deleteQuestion(
        @Param('id') id: string,
        @UserIdentity() user: IUserIdentity) {
        return this.questionService.deleteQuestion(id, user.id);
    }
}
