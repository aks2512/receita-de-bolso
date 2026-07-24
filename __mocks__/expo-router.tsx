import React from "react";

export const Link = ({ children, ...props }: any) => (
  <a {...props}>{children}</a>
);

export const Redirect = ({ href }: { href: string }) => (
  <div>Redirect: {href}</div>
);

export const useRouter = () => ({
  replace: jest.fn(),
});

export const useSearchParams = () => ({});
