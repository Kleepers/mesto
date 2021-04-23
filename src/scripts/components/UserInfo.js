export default class UserInfo {
    constructor({userName,userInfo,userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar)
    }
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent,
            userAvatar: this._userAvatar.style.backgroundImage
        }
    }
    setUserInfo(formData) {
        this._userName.textContent = formData.userName;

        this._userInfo.textContent = formData.userInfo;
    }
    setUserAvatar(formData) {
        this._userAvatar.style.backgroundImage = `url(${formData.userAvatar})`;
    }
}