export interface IGetUserIDByUsername {
  code: number
  message: string
  user: IUser
}

export interface IUser {
  userNum: number
  nickname: string
}
