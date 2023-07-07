/**
 * <Quick Rule>
 * For `React Component Props`, use `type`
 * For other object-like or class-like stuffs, use `interface`
 */
import { IUser } from './user.interface'

export interface IPlace {
  uuid: string;
  name: string;
  region: string;
  location: string,
  description: string;
  opening_hours: string;
  image_url?: string;
}

export interface IEquipment {
  uuid: string;
  name: string;
  description: string;
  fee: number;
  image_url?: string;
}

export interface IPlaceReservation {
  uuid: string;
  booker: IUser;
  place: IPlace;
  date: string;
  description: string;
  start_time: string;
  end_time: string;
  phone: string;
  status: string;
  title: string;
  created_at: Date;
}

export interface IEquipReservation {
  uuid: string;
  booker: IUser;
  equipments: IEquipment[];
  date: string;
  description: string;
  start_time: string;
  end_time: string;
  phone: string;
  status: string;
  title: string;
  created_at: Date;
}