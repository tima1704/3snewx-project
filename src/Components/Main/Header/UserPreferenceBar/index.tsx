import React from "react";

interface UserPreferenceBarProps {
  noticeCount?: number;
  memberName?: string;
}

export default function UserPreferenceBar({
  noticeCount,
  memberName,
}: UserPreferenceBarProps) {
  return (
    <section className="user-preference-bar d-flex">
      <div className="m-auto pr-4 d-flex">
        <svg
          className="m-auto"
          width="12"
          height="13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.12 13H.88c-.61 0-.92-.52-.88-1.13.02-.18.09-.35.17-.5l1.25-2.33.33-3.39s.5-2.67 2.63-3.62V1.7C4.38.76 5.1 0 6 0c.9 0 1.62.76 1.62 1.7v.33c2.12.95 2.63 3.62 2.63 3.62v3.4l1.5 2.25c.14.2.25.42.25.66 0 .57-.3 1.04-.88 1.04z"
            fill="#40F3F7"
          />
        </svg>
        <span className="p-2">{noticeCount}</span>
      </div>
      <div className="m-auto pr-4">{memberName}</div>
    </section>
  );
}
