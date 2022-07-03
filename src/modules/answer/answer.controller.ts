import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Request,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AnswerService} from "./answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {AuthGuard} from "../../common/guards/auth.guard";
import {ROLES} from "../../common/enums/roles";
import {Roles} from "../../common/decorators/roles.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {TransactionInterceptor} from "../../common/interceptors/transaction";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {UpdateAnswerDto} from "./dto/update-answer.dto";


@ApiBearerAuth()
@ApiTags('answers')
@UseGuards(AuthGuard)
@Roles(ROLES.CONSULTANT)
@Controller("answers")
// @UseInterceptors(TransactionInterceptor)

export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
    ) {
    }


    @Post()
    async createAnswer(@Body() dto: CreateAnswerDto, @UserIdentity() user: IUserIdentity) {
        return await this.answerService.createAnswer(dto, user.id);
    }


    @Get(':id')
    async getOneAnswer(@Param('id') id: string) {
        return await this.answerService.getOneAnswer(id);
    }

    @Patch('/:id')
    async updateAnswer(
        @Param('id') id: string,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @UserIdentity() user: IUserIdentity) {
        return await this.answerService.updateAnswer(id, updateAnswerDto, user.id);
    }


    @Delete(':id')
    async deleteAnswer(@Param('id') id: string, @UserIdentity() user: IUserIdentity) {
        return await this.answerService.deleteAnswer(id, user.id);
    }
}