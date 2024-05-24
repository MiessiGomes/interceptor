import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        try {
            return this.usersService.findOne(username)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message'
            },
                HttpStatus.FORBIDDEN,
                {
                    cause: error
                }
            )
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll()
    }
}
