"use client";

import * as z from 'zod';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|undefined>('');
  const [success, setSuccess] = useState<string|undefined>('');
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues)=>{
    
  }
  const {
    handleSubmit,
    formState: {
      errors
    },
    register
  } = useForm<FieldValues>({
    defaultValues: {
      id: '',
      password: ''
    }
  });
  return (
    <div>
      <form>
        <div>

        </div>
      </form>
    </div>
  )
};

export default SignIn;
