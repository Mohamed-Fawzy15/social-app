export interface signUpInterface {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export interface userData {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  createdAt: string;
}

export interface postData {
  _id: string;
  body: string | null;
  image: string;
  user: user;
  createdAt: string;
  comments?: CommentsEntity[] | null;
}

interface user {
  _id: string;
  name: string;
  photo: string;
}
interface CommentsEntity {
  _id: string;
  content: string;
  commentCreator: user;
  post: string;
  createdAt: string;
}
