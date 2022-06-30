import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards} from "@nestjs/common";
import {AnswerService} from "./providers/answer.service";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {AuthGuard} from "../../common/guards/auth.guard";
import {ROLES} from "../../common/enums/roles";
import {Roles} from "../../common/decorators/roles.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";


@ApiBearerAuth()
@ApiTags('answers')
@UseGuards(AuthGuard)
@Roles(ROLES.CONSULTANT)
@Controller("answers")
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
    ) {
    }


    @Post()
    async createAnswer(@Body() dto: CreateAnswerDto, @Request() req) {
        return await this.answerService.createAnswer(dto, req.user.id);
    }


    @Get(':id')
    async getOneAnswer(@Param('id') id: string) {
        return await this.answerService.getOneAnswer(id);
    }

    @Put('/:id')
    async updateAnswer(@Param('id') id: string, @Body() dto: CreateAnswerDto, @Request() req) {
        return await this.answerService.updateAnswer(id, dto, req.user.id);
    }


    @Patch(':id')
    async submitAnswer(@Param('id') id: string, @Request() req) {
        return await this.answerService.submitAnswer(id, req.user.id);
    }

    @Delete(':id')
    async deleteAnswer(@Param('id') id: string, @Request() req) {
        return await this.answerService.deleteAnswer(id, req.user.id);
    }
}