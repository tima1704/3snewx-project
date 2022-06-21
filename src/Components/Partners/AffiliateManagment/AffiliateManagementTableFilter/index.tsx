import {
  AsyncInputTags,
  InputSearch,
  InputTags,
} from "Components/MiniComponents";

export default function AffiliateManagementTableFilter() {
  return (
    <div>
      <InputSearch />
      <InputTags name="status" onChange={() => {}} />
      <AsyncInputTags name="categories" onChange={() => {}} isMulti />
      <AsyncInputTags name="geo" onChange={() => {}} isMulti />
      <AsyncInputTags name="geo" onChange={() => {}} isMulti />
      <InputTags name="trafficSource" onChange={() => {}} />
      
    </div>
  );
}
