import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
    let errors: IGenericErrorMessage[] = [];
    let message = '';
    const statusCode = 400;
    if (error.code === 'P2025') {
        message = (error.meta?.cause as string) || 'Record not found';
        errors = [
            {
                path: '',
                message: message
            }
        ];
    } else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete Failed';
            errors = [
                {
                    path: '',
                    message: message
                }
            ];
        }
    }

    return {
        statusCode,
        message: 'P2003 Error',
        errorMessages: errors
    };
};

export default handleClientError;
