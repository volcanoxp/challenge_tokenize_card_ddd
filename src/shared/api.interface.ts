import { APIGatewayProxyResult, APIGatewayEvent, Context } from 'aws-lambda';
import { ErrorResult } from './errors';

export type ApiResponse = APIGatewayProxyResult;

export type ApiHandler = (event: APIGatewayEvent, context: Context) => Promise<ApiResponse>;

export interface ErrorResponseBody {
  error: ErrorResult;
}
