
import { UsersService } from '../../../../@types/common/interface';
import User from './models/user.modal';

export default class UsersServiceRepository
  implements UsersService.IUserRepository {
  private _formatUserOutputEntity(
    user: User,
    options?: { enableStr?: boolean; displayId?: boolean },
  ): UsersService.UserEntity {
    const { enableStr, displayId } = options;
    const {
      interests,
      _id,
      email,
      name,
      phone_number,
      profile_image_url,
    } = user;
    
    const withId = {
      _id: enableStr ? _id + '' : _id,
      interests: interests,
      email,
      name,
      phoneNumber: phone_number + '',
      profilePic: profile_image_url,
    };
    const noId = {
      interests: interests,
      email,
      name,
      phoneNumber: phone_number + '',
      profilePic: profile_image_url,
    };
    return displayId ? withId : noId;
  }

  async findUser(
    options: UsersService.validationFields,
  ): Promise<UsersService.IUserModel> {
  
    let user: User;
    if (options.email) {
      const res = await User.query()
        .select('*')
        .where('email', '=', options.email);
      user = res[0];
    }
    if (options._id) {
      const res: User[] = await User.query()
        .select('*')
        .where('_id', '=', options._id);
      user = res[0];
    }

    
    return {
      _id: user._id,
      interests: user.interests,
      email: user.email,
      name: user.name,
      phoneNumber: user.phone_number + '',
      profilePic: user.profile_image_url,
      password: user.password,
    };
  }
  async saveUser(
    options: UsersService.IUserModel,
  ): Promise<UsersService.UserEntity> {
    const {
      interests,
      name,
      email,
      password,
      phoneNumber,
      profilePic,
    } = options;
    

    const savedUser = await User.query().insertAndFetch({
      name,
      email,
      password,
      phone_number: phoneNumber,
      profile_image_url: profilePic,
      interests,
    });
    
    return this._formatUserOutputEntity(savedUser, { displayId: false });
  }
  async UpdateUserField(input: {
    options: UsersService.validationFields;
    updateParam: UsersService.IUpdateField;
  }): Promise<UsersService.UserEntity> {
    
    const { options, updateParam } = input;
    
    const { value } = updateParam;
    const user = await User.query().patchAndFetchById(options._id, {
      profile_image_url: value,
    });

    
    return this._formatUserOutputEntity(user, {
      enableStr: true,
      displayId: true,
    });
  }
}
