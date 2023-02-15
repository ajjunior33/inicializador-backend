import Joi from 'joi';
import { ValidateRouter } from '../ValidateRouter';

const SchemaRouter = Joi.object().keys({
  refresh_token: Joi.string().required()
});

function MiddlewareRefreshToken(request,response,next){
  if(ValidateRouter(SchemaRouter, request.body)){
    next();
  }
}

export {MiddlewareRefreshToken}