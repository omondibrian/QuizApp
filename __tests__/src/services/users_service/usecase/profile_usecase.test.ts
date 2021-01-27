/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from '../../../../../@types/common/interface';
import ProfileUsecase from '../../../../../src/services/users_service/usecase/profile_usecase';
// eslint-disable-next-line jest/no-mocks-import

class UsersTestRepository implements UsersService.IUserRepository {
  findUser(
    _options: UsersService.validationFields,
  ): Promise<UsersService.IUser> | any {
    const user: UsersService.IUserModel = {
      name: 'testUser',
      password: 'test',
      email: 'testUser@test.com',
      phoneNumber: '13011999',
      _id: 1,
      interests: 'web dev',
      profilePic: 'testpath//test.jpg',
    };
    return Promise.resolve(user);
  }
  async saveUser(
    options: UsersService.IUserModel,
  ): Promise<UsersService.UserEntity> {
    const { interests, phoneNumber, profilePic, email, name } = options;
    return {
      interests,
      phoneNumber,
      name,
      profilePic,
      email,
      _id: '1',
    };
  }
  UpdateUserField(_inputs: {
    options: UsersService.validationFields;
    updateParam: UsersService.IUpdateField;
  }): Promise<UsersService.UserEntity> | any {}
}

const testRepo = new UsersTestRepository();

const newUser: UsersService.UserEntity = {
  name: 'testUser',
  email: 'testUser@test.com',
  phoneNumber: '13011999',
  _id: '1',
  interests: 'web development',
  profilePic: 'testpath//test.jpg',
};

describe('ProfileUsecase', () => {
  const profileUsecase = new ProfileUsecase(testRepo);
  const id = '1';

  describe('ProfileUsecase.changeProfilePhoto()', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      const mockUpdate = jest.spyOn(testRepo, 'UpdateUserField');
      mockUpdate.mockImplementation(() => {
        return {
          name: 'testUser',
          email: 'testUser@test.com',
          phoneNumber: '13011999',
          _id: '1',
          interests: 'web development',
          profilePic: 'testpath/test_new.jpg',
        };
      });
    });

    it('should successfully change user profile picture', async () => {
      const result = await profileUsecase.changeProfilePhoto({
        _id: '1',
        payload: 'testpath/test_new.jpg',
      });

      expect(result).toStrictEqual<{ _id: string; profilePic: string }>({
        _id: '1',
        profilePic: 'testpath/test_new.jpg',
      });
    });
  });

  describe('ProfileUsecase.fetchProfile()', () => {
    beforeEach(() => {
      const user: UsersService.IUserModel = {
        name: 'testUser',
        password: 'test',
        email: 'testUser@test.com',
        phoneNumber: '13011999',
        _id: 1,
        interests: 'web development',
        profilePic: 'testpath//test.jpg',
      };
      jest.spyOn(testRepo, 'findUser').mockReturnValue(user);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should sucessfully return a valid user entity', async () => {
      const result = await profileUsecase.fetchProfile(id);
      expect(result).toStrictEqual<UsersService.UserEntity>(newUser);
    });
  });
});
