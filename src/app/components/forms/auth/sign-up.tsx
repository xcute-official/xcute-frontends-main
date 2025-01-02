"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage, SuccessMessage } from '../../status-messages';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FormPasswordInput, FormTextInput } from '../../inputs';
import { LoadingButton } from '../../buttons';
import { signUp } from '@/app/actions/authenticating';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>('');
  const [success, setSuccess] = useState<string|undefined>('');
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues)=>{
    setIsLoading(true);
    setError('');
    setSuccess('');
    signUp(data).then((response)=>{
      if(response.isAuthenticated && response.redirected && response.status===200){
        router.push(response.redirected);
      }else{
        setError(response.message || 'Unknown error, occurs');
      }
    }).catch(()=>{
      setError('client side error');
    }).finally(()=>setIsLoading(false));
  }
  const {
    handleSubmit,
    formState: {
      errors
    },
    register
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: '',
      email: ''
    }
  });
  return (
    <div>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <FormTextInput disabled={isLoading} label='Username' placeholder='username' id="username" register={register} errors={errors} />
          <FormTextInput disabled={isLoading} label='Email' type='email' placeholder='email' id="email" register={register} errors={errors} />
          <FormPasswordInput disabled={isLoading} label='Password' placeholder='password' id="password" register={register} errors={errors} />
        </div>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <LoadingButton disabled={isLoading} fullWidth type='submit' verbs={['signup', 'signing up']} />
      </form>
    </div>
  )
};

export default SignUp;
