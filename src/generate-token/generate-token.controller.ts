import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";


export const generateToken = (event: APIGatewayEvent, context: Context) => {
  const agua_ted = "dad";
  return {
    'hello': 'world'
  }
}
