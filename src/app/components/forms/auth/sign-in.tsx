"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FormPasswordInput, FormTextInput } from '../../inputs';
import { LoadingButton } from '../../buttons';
import { signIn } from '@/app/actions/authenticating';
import { ErrorMessage, SuccessMessage } from '../../status-messages';
import { useUserSession } from '@/app/contexts/user-session';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>('');
  const [success, setSuccess] = useState<string|undefined>('');
  const { updateUser } = useUserSession();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues)=>{
    setIsLoading(true);
    setError('');
    setSuccess('');
    signIn(data).then(async (response)=>{
      if(response.isAuthenticated && response.redirected && response.status===200){
        setSuccess('loggedIn, you are being redirected ...');
        await updateUser();
        router.push(response.redirected);
      }else{
        setError(response.message || 'Unknown error, occurs')
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
      id: '',
      password: ''
    }
  });
  return (
    <div>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <FormTextInput disabled={isLoading} label='Username, email id' placeholder='username' id="id" register={register} errors={errors} />
          <FormPasswordInput disabled={isLoading} label='Password' placeholder='password' id="password" register={register} errors={errors} />
        </div>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <LoadingButton disabled={isLoading} fullWidth type='submit' verbs={['login', 'loggingIn']} />
      </form>
    </div>
  )
};

export default SignIn;
