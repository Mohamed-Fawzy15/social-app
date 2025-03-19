export interface signUpInterface {
    name: string
    email: string
    password: string
    rePassword: string
    dateOfBirth: string
    gender: string
  }
  

  export interface loginInterface {
    email: string
    password: string
  }

 export interface userData {
    _id: string
    name: string
    email: string
    dateOfBirth: string
    gender: string
    photo: string
    createdAt: string
  }