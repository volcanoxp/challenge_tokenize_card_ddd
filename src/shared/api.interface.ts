import { APIGatewayProxyResult, APIGatewayEvent, Context } from 'aws-lambda';
import { ErrorResult } from './errors';

export type ApiResponse = APIGatewayProxyResult;

export type ApiHandler = (event: APIGatewayEvent, context: Context) => Promise<ApiResponse>;
export type GuardApiHandler = (event: any) => Promise<any>;

export interface ErrorResponseBody {
  error: ErrorResult;
}

export type EffectPolicy = "Allow" | "Deny"
