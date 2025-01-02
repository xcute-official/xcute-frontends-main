"use client";

import { createNoteConfig, readNoteConfig } from "@/app/actions/content";
import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormTextareaInput, FormTextInput } from "@/app/components/inputs";
import { ErrorMessage, SuccessMessage } from "@/app/components/status-messages";
import { LoadingButton } from "@/app/components/buttons";

const NoteConfigForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>('');
  const [success, setSuccess] = useState<string|undefined>('');
  
  const router = useRouter();
  const { handleSubmit, register, formState: {errors}, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      category: 'FRONTEND'
    }
  });
  useEffect(()=>{
    const init = async ()=>{
      if(id!=='new'){
        setIsLoading(true);
        const getNoteConfig = await readNoteConfig(id as string);
        if(getNoteConfig.status===200 && getNoteConfig.data){
          setValue('title', getNoteConfig.data.title);
          setValue('description', getNoteConfig.data.description);
          setValue('tags', getNoteConfig.data.tags);
          setValue('category', getNoteConfig.data.category);
        }
      }
    }
    init();
  }, [id, setValue]);
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues)=>{
    setIsLoading(true);
    setError('');
    setSuccess('');
    createNoteConfig(data).then((response)=>{
      if(response.status===200 && response.redirected){
        setSuccess('note config created');
        router.push(response.redirected);
      }
    })
  }
  return (
    <section className="w-full mt-8">
      <div className="w-full md:mx-auto md:w-1/2">
        <div>
          <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              <FormTextInput disabled={isLoading} label='Title' placeholder='title' id="title" register={register} errors={errors} />
              <FormTextareaInput disabled={isLoading} label='Description' placeholder='description' id="description" register={register} errors={errors} />
            </div>
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            <LoadingButton disabled={isLoading} fullWidth type='submit' verbs={['set', 'setting']} />
          </form>
        </div>
      </div>
    </section>
  )
};

export default NoteConfigForm;
