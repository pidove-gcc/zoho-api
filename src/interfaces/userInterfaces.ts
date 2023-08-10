export interface IDTOUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUserMeeting extends IDTOUser {
  date: string;
  startTime: string;
  endTime: string;
}

export interface ConverData {
  params: JSON;
  url: String;
  type: String;
}
