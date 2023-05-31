import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

// extract user nested by strategy method in request 
export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const user = req.user
        if (!user) throw new InternalServerErrorException('User not found in the requets')
        return (!data)
            ? data
            : user[data]
    }
)
