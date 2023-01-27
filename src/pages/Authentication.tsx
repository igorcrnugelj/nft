import React, { Fragment } from "react";
import AuthForm from "../components/auth/AuthForm";

const Authentication = () => {
  return <AuthForm />;
};

export default Authentication;

export async function action({ request }: any) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const res = await fetch("http://...some url" + mode, {
    method: "POST",
  });
}
