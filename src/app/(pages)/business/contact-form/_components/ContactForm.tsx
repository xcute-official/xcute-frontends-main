"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormPasswordInput, FormTextareaInput, FormTextInput } from "@/app/components/inputs";
import { ErrorMessage, SuccessMessage } from "@/app/components/status-messages";
import { LoadingButton } from "@/app/components/buttons";
import { createContact } from "@/app/actions/business";
const ContactForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string|undefined>('');
const [success, setSuccess] = useState<string|undefined>('');
const router = useRouter();
  const { formState: {errors}, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
        email: '',
        message: '',
        contact: '',
        name: '',
        subject: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues)=>{
    setIsLoading(true);
    createContact(data).then((response)=>{
      if(response.status===200 && response.message){
        setSuccess(response.message);
        router.push('/business');
      }else{
        setError(response.message);
      }
    }).catch(()=>setError('unknown error occured')).finally(()=>setIsLoading(false));
  }
  return (
    <div className="w-full">
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
            <FormTextInput disabled={isLoading} label='Email' placeholder='email' id="email" register={register} errors={errors} />
            <FormTextInput disabled={isLoading} label='Name' placeholder='name' id="name" register={register} errors={errors} />
            <FormTextInput disabled={isLoading} label='Contact' placeholder='contact' id="contact" register={register} errors={errors} />
            <FormTextInput disabled={isLoading} label='Subject' placeholder='subject' id="subject" register={register} errors={errors} />
            <FormTextareaInput disabled={isLoading} label='Message' placeholder='message' id="message" register={register} errors={errors} />
        </div>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <LoadingButton disabled={isLoading} fullWidth type='submit' verbs={['send', 'sending']} />
        </form>
    </div>
    )
};

export default ContactForm;
