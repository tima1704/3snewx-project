export enum ETrafficbackSet {
  global_trafficback_url = "global_trafficback_url",
  use_for_disabled_offers = "use_for_disabled_offers",
  use_by_other_reasons = "use_by_other_reasons",
  conversion_status_for_caps_count = "conversion_status_for_caps_count",
  trafficback_over_caps = "trafficback_over_caps",
}

export interface ITrafficbackSet {
  global_trafficback_url: string;
  use_for_disabled_offers: boolean;
  use_by_other_reasons: boolean;
  conversion_status_for_caps_count: string[];
  trafficback_over_caps: boolean;
}

export const initialSetTrafficback: ITrafficbackSet = {
  global_trafficback_url: "",
  use_for_disabled_offers: true,
  use_by_other_reasons: true,
  conversion_status_for_caps_count: [],
  trafficback_over_caps: false,
};
