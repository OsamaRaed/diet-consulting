import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards, UseInterceptors,
} from "@nestjs/common";
import {AnswerService} from "./answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {AuthGuard} from "../../common/guards";
import {RolesEnum} from "../../common/enums/rolesEnum";
import {Roles} from "../../common/decorators/roles.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {UpdateAnswerDto} from "./dto/update-answer.dto";
import {TransactionInterceptor} from "../../common/interceptors/transaction";
import {Transaction} from "sequelize";
import {TransactionParam} from "../../common/decorators/transaction.decorator";


@ApiBearerAuth()
@ApiTags('answers')
@UseGuards(AuthGuard)
@Controller("answers")

export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
    ) {
    }

    @Roles(RolesEnum.CONSULTANT)
    @Post()
    @UseInterceptors(TransactionInterceptor)
    async createAnswer(
        @Body() dto: CreateAnswerDto,
        @TransactionParam() transaction: Transaction,
        @UserIdentity() user: IUserIdentity) {
        return await this.answerService.createAnswer(dto, user.id, transaction);
    }

    @Roles(RolesEnum.CONSULTANT)
    @Get(':id')
    async getOneAnswer(@Param('id') id: string) {
        return await this.answerService.getOneAnswer(id);
    }


    @Roles(RolesEnum.CONSULTANT)
    @Patch('/:id')
    @UseInterceptors(TransactionInterceptor)
    async updateAnswer(
        @Param('id') id: string,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @TransactionParam() transaction: Transaction,
        @UserIdentity() user: IUserIdentity) {
        return await this.answerService.updateAnswer(id, updateAnswerDto, user.id,transaction);
    }


    @Roles(RolesEnum.COORDINATOR)
    @UseInterceptors(TransactionInterceptor)
    @Patch(':id/verify')
    async verifyAnswer(@Param('id') id: string,@TransactionParam() transaction: Transaction, ) {
        return await this.answerService.verifyAnswer(id, transaction);
    }

    @Roles(RolesEnum.CONSULTANT)
    @Delete(':id')
    async deleteAnswer(@Param('id') id: string, @UserIdentity() user: IUserIdentity) {
        return await this.answerService.deleteAnswer(id, user.id);
    }
}