import { APIGatewayEvent, Context } from "aws-lambda";


export const generateToken = (event: APIGatewayEvent, context: Context) => {
  return {
    'hello': 'world'
  }
}
