

type UserInfoType = {
    userName: String,
    email: String,
    emailVerified: Boolean,
    isAnonymous: Boolean,
    phoneNumber: String,
    photoURL: String,
}

type UserDataType = {
    Created: Date,
    ID: String,
    userInfo: UserInfoType
}

const NewUser: UserDataType = {
    Created: new Date(),
    ID: '',
    userInfo: {
        userName: '',
        email: '',
        emailVerified: false,
        isAnonymous: false,
        phoneNumber: '',
        photoURL: '',
    }

}


export class User {
    UserDetails: UserDataType

    constructor(user: UserDataType) {
        if (user) this.UserDetails = user
        else this.UserDetails = NewUser
    }
}

