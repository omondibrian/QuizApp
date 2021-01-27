/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAuthserviceUtilities {
  loginValidation: (entityBody: UsersService.UserCredentials) => any;
  registrationValidation: (entityBody: UsersService.regParams) => any;
}
import * as yup from 'yup';
import { UsersService } from '../@types/common/interface';
export class AuthserviceUtilities implements IAuthserviceUtilities {
  async loginValidation(entityBody: UsersService.UserCredentials) {
    const loginValidationschema = yup.object().shape({
      email: yup.string().email().required().trim(),
      password: yup.string().trim().required(),
      phoneNumber: yup.string().trim(),
    });
    const res = await loginValidationschema.validate(entityBody);
    return res;
  }
  async registrationValidation(entityBody: UsersService.regParams) {
    const registrationValidationschema = yup.object().shape({
      email: yup.string().email().required().trim(),
      password: yup.string().trim().required(),
      phoneNumber: yup.string().trim().required(),
      name: yup.string().required(),
      profilePic: yup.string().notRequired(),
    });
    const res = await registrationValidationschema.validate(entityBody);
    return res;
  }
}
