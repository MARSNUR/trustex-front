import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ email, password }) {
    return api
      .post("/User/authenticate", {
        email,
        password
      }, {withCredentials: true, credentials: "include",})
      .then((response) => {
        if (response.data.jwtToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
    api.post("/User/revoke-token", {}).then(
        (response) => {
          console.log(response);
        }
    );
  }

  register({ email, lastname, firstname, dateBirth, password, confirmPassword}) {
    return api.post("/User/register", {
      email,
      lastname,
      firstname,
      dateBirth,
      password,
      confirmPassword,
    });
  }

  userUpdate({ email, lastname, firstname, dateBirth, userId}) {
    return api.put("/User/" + userId, {
      email,
      lastname,
      firstname,
      dateBirth,
    });
  }

  documentsUpload(formData) {
    return api.post("/User/upload-docs", formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
  }

  verify(token){
    return api.post("/User/verify-email",{
      token
    });
  }

  getUserDetails(userId) {
    return api
        .get("/User/" + userId)
        .then((response) => {
          return response.data;
        });
  }
}

export default new AuthService();
