import { APIGatewayProxyResult, APIGatewayEvent, Context } from 'aws-lambda';
import { ErrorResult } from './errors';

export type ApiResponse = APIGatewayProxyResult;

export type ApiHandler = (event: APIGatewayEvent, context: Context) => Promise<ApiResponse>;
export type GuardApiHandler = (event: any) => Promise<GuardResponse>;

export interface ErrorResponseBody {
  error: ErrorResult;
}

export type EffectPolicy = "Allow" | "Deny"

interface StatementInterface {
  Action: string;
  Effect: EffectPolicy;
  Resource: string;
}

interface PolicyDocument {
  Version: string;
  Statement: StatementInterface[]
}

export interface  GuardResponse {
  principalId: string;
  policyDocument: PolicyDocument
}
