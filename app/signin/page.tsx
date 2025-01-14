export const runtime = "edge";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { auth, signIn } from "@/auth";

import Custombutton from "../components/CustomButton";
import { DonezoLogo } from "../icons/Logo";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await auth();

  if (session) {
    redirect("/tasks");
  }

  const handleSignIn = async () => {
    "use server";
    const result: { error?: string } = await signIn("google");
    if (result?.error) {
      console.error(result.error);
    } else {
      redirect("/tasks");
    }
  };
  return (
    <Card className="w-[350px] bg-[#191919] border-0">
      <CardHeader>
        <div className="flex justify-center w-full mb-5">
          <DonezoLogo color="white" height={40} width={180} />
        </div>
        <CardDescription className="text-center">
          Sign In with Google to start clocking in.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Custombutton
          content="Sign In with Google"
          className="w-full"
          onClick={handleSignIn}
        />
      </CardFooter>
    </Card>
  );
}
