import { UsersService } from "../../@types/common/interface";
import { AuthserviceUtilities } from "../../src/serviceUtility";

describe("AuthserviceUtilities", () => {
  const auth = new AuthserviceUtilities();
  describe("AuthserviceUtilities.loginValidation()", () => {
    it("should successfully validate the user log in credentials", async () => {
      const credentials: UsersService.UserCredentials = {
        email: "testUser@test.com",
        password: "test",
        
      };
      const res = await auth.loginValidation(credentials);
      expect(res.error).toBeFalsy();
    });
  });

  describe("AuthserviceUtilities.registrationValidation()", () => {
    it("should successfully validate the new user's details", async () => {
      const userDetails: UsersService.regParams = {
        name: "testUser",
        password: "test",
        email: "testUser@test.com",
        phoneNumber: "13011999",
        profilePic: "testpath//test.jpg",
        interests:'web development'
      };
      const res = await auth.registrationValidation(userDetails);
      expect(res).toBeTruthy();
    });
  });
});