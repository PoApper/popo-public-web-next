/**
 * <Quick Rule>
 * For `React Component Props`, use `type`
 * For other object-like or class-like stuffs, use `interface`
 */

export interface IEquipment {
  uuid: string;
  name: string;
  description: string;
  fee: number;
  imageName: string;
}

export interface IBooker {
  name: string;
  userTYpe: string;
}

export interface IPlaceReservation {
  uuid: string;
  booker: IBooker;
  date: string;
  description: string;
  start_time: string;
  end_time: string;
  phone: string;
  status: string;
  title: string;
}