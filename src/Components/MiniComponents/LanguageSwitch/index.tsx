import React from "react";

interface LanguageSwitchProps {
  active: string;
}

export default function LanguageSwitch({ active }: LanguageSwitchProps) {
  return (
    <div className="">
      <svg
        width="30"
        height="30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 30a15 15 0 100-30 15 15 0 000 30z" fill="#F0F0F0" />
        <path
          d="M3.1 5.87a14.95 14.95 0 00-2.58 5.22h7.8L3.1 5.87zM29.48 11.09a14.95 14.95 0 00-2.58-5.22l-5.22 5.22h7.8zM.52 18.91c.51 1.92 1.4 3.69 2.58 5.22l5.22-5.22H.52zM24.13 3.1A14.95 14.95 0 0018.91.52v7.8l5.22-5.22zM5.87 26.9a14.95 14.95 0 005.22 2.58v-7.8L5.87 26.9zM11.09.52c-1.92.51-3.69 1.4-5.22 2.58l5.22 5.22V.52zM18.91 29.48c1.92-.51 3.69-1.4 5.22-2.58l-5.22-5.22v7.8zM21.68 18.91l5.22 5.22a14.95 14.95 0 002.58-5.22h-7.8z"
          fill="#0052B4"
        />
        <path
          d="M29.87 13.04H16.96V.13a15.15 15.15 0 00-3.92 0v12.91H.13a15.15 15.15 0 000 3.92h12.91v12.91a15.15 15.15 0 003.92 0V16.96h12.91a15.15 15.15 0 000-3.92z"
          fill="#D80027"
        />
        <path
          d="M18.91 18.91l6.7 6.7c.3-.31.6-.63.88-.97l-5.73-5.73H18.9zM11.09 18.91l-6.7 6.7c.31.3.63.6.97.88l5.73-5.73V18.9zM11.09 11.09l-6.7-6.7c-.3.31-.6.63-.88.97l5.73 5.73h1.85zM18.91 11.09l6.7-6.7c-.31-.3-.63-.6-.97-.88l-5.73 5.73v1.85z"
          fill="#D80027"
        />
      </svg>
      <span className="pl-2">{active}</span>
    </div>
  );
}