export interface IAffiliate {
  id: string;
  email: string;
  status: string;
  manager: { id: string; name: string };
  connectOffer: string;
  registered: string;
  isDoubled: boolean;
}
