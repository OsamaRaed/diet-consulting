import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    ParseIntPipe, Param, Delete, Patch, UseInterceptors
} from "@nestjs/common";
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {Roles} from "../../common/decorators/roles.decorator";
import {RolesEnum} from "../../common/enums/rolesEnum";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {Question} from "./question.model";
import {TransactionParam} from "../../common/decorators/transaction.decorator";
import {Transaction} from "sequelize";
import {TransactionInterceptor} from "../../common/interceptors/transaction";

@ApiTags('questions')
@Controller("questions")
@ApiBearerAuth()
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {
    }

    @Post()
    @Roles(RolesEnum.PATIENT)
    @UseInterceptors(TransactionInterceptor)
    async createQuestion(
        @UserIdentity() user: IUserIdentity,
        @TransactionParam() transaction: Transaction,
        @Body() body: CreateQuestionDto) {
        return this.questionService.createQuestion(body, user.id,transaction);
    }


    @Get()
    async getQuestions(
        @UserIdentity() user: IUserIdentity,
        @Query('offset', ParseIntPipe) offset?: number,
        @Query('limit', ParseIntPipe) limit?: number,
    ) {
        return this.questionService.getQuestions(limit || 0, offset || 10, user.id);
    }


    @Patch('/:id')
    @Roles(RolesEnum.PATIENT)
    @UseInterceptors(TransactionInterceptor)
    async updateQuestion(
        @Param('id') id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
        @TransactionParam() transaction: Transaction,
        @UserIdentity() user: IUserIdentity): Promise<Question> {
        return this.questionService.updateQuestion(id, updateQuestionDto, user.id, transaction);
    }

    @Get(':id')
    async getOneQuestion(@Param('id') id: number): Promise<Question> {
        return this.questionService.getOneQuestion(id);
    }

    @Delete(':id')
    @Roles(RolesEnum.PATIENT)
    async deleteQuestion(
        @Param('id') id: string,
        @UserIdentity() user: IUserIdentity) {
        return this.questionService.deleteQuestion(id, user.id);
    }
}
