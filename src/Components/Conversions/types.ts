export interface IConversions {
  id: number;
  status: string;
  click_id: string;
  is_paid: boolean;
  goal: string | number;
  action_id: string;
  ip: string;
  user_agent: string;
  os: string;
  mobile_isp: string;
  referer: string;
  currency: string;
  device: string;
  payouts: string;
  revenue: string;
  af_price: string;
  approve_dt: string;
  offer: {
    id: number;
    title: string;
  };
  advert: {
    id: number;
    title: string;
  };
  affiliate: {
    id: number;
    title: string;
  };
}
