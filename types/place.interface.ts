export interface IPlace {
  uuid: string;
  name: string;
  description: string;
  location: string;
  region: string;
  staff_email: string;
  image_url: string;
  max_minutes: number;
  max_concurrent_reservation: number;
  opening_hours: string;
  enable_auto_accept: string;
  total_reservation_count: number;
  createdAt: string;
  updateAt: string;
}
