/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generate } from 'randomstring';
import { IMailer, Mailer } from '../../services/email_service/mailer';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
      cb(null, 'uploads');
  },
  filename: (_req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (_req: any, file: { mimetype: string; }, cb: (arg0: any, arg1: boolean) => void) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
import ProfileUsecase from '../../services/users_service/usecase/profile_usecase';
import AuthenticationUsecase from '../../services/users_service/usecase/auth';
import UsersServiceRepository from '../../services/users_service/service_repository/index';
import {
  IAuthserviceUtilities,
  AuthserviceUtilities,
} from '../../serviceUtility';
import path from 'path';

const utils: IAuthserviceUtilities = new AuthserviceUtilities();
const mailer: IMailer = new Mailer();
const userRoutes = Router();
const repository = new UsersServiceRepository();

const profileUseCase = new ProfileUsecase(repository);
const authUsecase = new AuthenticationUsecase(
  repository,
  utils,
  jwt,
  bcrypt,
  generate,
  mailer,
);
/**
 * @method POST
 * @description login route
 * @param  {UsersService.UserCredentials} req.body.credentials
 */
userRoutes.post('/login', async (req, res, next) => {
  const { email, password, phoneNumber } = req.body;
  try {
    const result = await authUsecase.logInUser({
      email,
      password,
      phoneNumber,
    });
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method POST
 * @description register user route
 * @param  {UsersService.IUserModel} req.body.newUser
 */
userRoutes.post(
  '/register',
  upload.single('profilePhoto'),
  async (req, res, next) => {
    const { email, password, phoneNumber, name, interests } = req.body;
    
    try {
      const result = await authUsecase.registeruser({
        email,
        password,
        phoneNumber,
        name,
        interests,
        profilePic: req.file.originalname,
      });
      res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @method POST
 * @description forgot password route
 * @param  {UsersService.IUserModel} req.body.credentials
 */
userRoutes.post('/forgot', async (req, res, next) => {
  const {password,email,phoneNumber} = req.body;
  try {
    const result = await authUsecase.forgotPass({password,email,phoneNumber});
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method POST
 * @description change profilePhoto
 * @param  {UsersService.ProfileInputs} req.body
 */
userRoutes.post(
  '/profile',
  upload.single('profilePhoto'),
  async (req, res, next) => {
    const { _id } = req.body;
    const payload = req.file.originalname;
    try {
      const result = await profileUseCase.changeProfilePhoto({ _id, payload });
      res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @method Post
 * @description fetch user profile
 * @param  {string} req.body._id
 */
userRoutes.post('/profile/id', async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await profileUseCase.fetchProfile(id);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

export default userRoutes;
