export declare namespace UsersService {
    interface UserEntity {
      _id?: number | string;
      name: string;
      email: string;
      phoneNumber: string;
      profilePic: string;
      interests:string;
    
    }
  
    type fieldProperties =
      | "_id"
      | "name"
      | "email"
      | "phone_number"
      | "profile_image_url"
      
  
      type regParams = {
        email: string;
        password: string;
        phoneNumber: string;
        name: string;
        interests:string;
        profilePic: string;
      };
    interface IUpdateField {
      field: fieldProperties;
      value: string;
    }
    interface UserCredentials {
      email?: string;
      phoneNumber?: string;
      password: string;
    }
    

    type validationFields = {
      email?: string;
      phone_number?: string;
      _id?: string;
    };
    type ProfileInputs = {
      _id: string;
      payload: string;
    };
    interface IUser extends UserCredentials {
      _id?: number;
      name: string;
      email: string;
      phone_number: string;
      profile_image_url: string;
      interests:string;
    }
    interface IUserModel {
      _id?: number | string;
      name: string;
      email: string;
      phoneNumber: string;
      profilePic: string;
      password: string;
      interests:string;
      }
    
    interface IUserRepository {
      findUser: (options: validationFields) => Promise<IUserModel>;
      saveUser: (options: IUserModel) => Promise<UserEntity>;
      UpdateUserField: (input: {
        options: validationFields;
        updateParam: IUpdateField;
      }) => Promise<UserEntity>;
     
    }
  }

 export declare namespace Questions {
    interface Quiz{
      question:string;
      _id?:number;
  }
  
  interface IQuestionsRepository{
      createNewQuestion(quiz:string):Promise<Quiz>;
      FetchQuestions():Promise<Array<Quiz>>;
      
  }
  }