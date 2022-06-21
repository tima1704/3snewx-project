export interface IAdvertItem {
  id: string | number;
  company: string;
  manager: { id: string | number; name: string };
  contacts: [];
  email: string;
  offer_count: number;
}
