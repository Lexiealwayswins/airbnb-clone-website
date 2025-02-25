"use client";

import useLoginModal from "@/hook/useLoginModal";
import { Modal } from "./Modal";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler }  from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import useRegisterModal from "@/hook/useRegisterModal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";

type Props = {};
export const LoginModal = ({}: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Login Successfully");
        router.refresh();
        loginModal.onClose();
      } else if (callback?.error) {
        toast.error("Something Went Wrong");
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const body = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome Back"
        subtitle="Login to Your Account"
        center
      />
      <Input 
        id="email"
        label="Email Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn('facebook')}
        isColor
      />
      <div className="my-2 text-center text-neutral-500 font-light">
        <div>
          {`Didn't have an Account?`}{" "}
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          > 
            Create an Account 
          </span>
        </div>
      </div>
    </div>

  );
  return (
    <Modal 
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      title="Login"
      body={body}
      footer={footer}
      actionLabel="Continue"
    />
  );
};