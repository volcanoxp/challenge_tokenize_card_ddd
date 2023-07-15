import { ApiResponse, ErrorResponseBody } from "./api.interface";
import { BadRequestResult, ErrorResult, InternalServerErrorResult } from "./errors";
import { HttpStatusCode } from "./http-status-codes";
import { ErrorCode } from "./error-codes";

export class ResponseBuilder {
  public static badRequest(code: string, description: string): ApiResponse {
    const errorResult: BadRequestResult = new BadRequestResult(code, description);
    return ResponseBuilder._returnAs<BadRequestResult>(errorResult, HttpStatusCode.BadRequest);
  }

  public static internalServerError(_error: Error): ApiResponse {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
    return ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, HttpStatusCode.InternalServerError);
  }

  public static ok<T>(result: T): ApiResponse {
    return ResponseBuilder._returnAs<T>(result, HttpStatusCode.Ok);
  }


  private static _returnAs<T>(result: T, statusCode: number): ApiResponse {
    const bodyObject: ErrorResponseBody | T = result instanceof ErrorResult
      ? { error: result }
      : result;
    const response: ApiResponse = {
      body: JSON.stringify(bodyObject),
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode
    };

    return response;
  }
}
