// @flow
import * as React from 'react';
import {useForm} from "react-hook-form";
import {LoginFormType} from "@/app/lib/types/Types";
import {useUser} from "@/app/lib/context/UserContext";
import {redirect} from "next/navigation";
import {AuthFormInput} from "@/app/ui/auth/AuthFormInput";

export function LoginForm() {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>()
    const {authLogin} = useUser()

    const onSubmit = (data: LoginFormType) => {
        authLogin({username: data.username, password: data.password})
    }


    return (
        <form
            className={'w-fit max-w-[80vw] bg-white mx-auto flex flex-col gap-5 p-10 rounded-lg'}
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Password Input */}
            <AuthFormInput label="UserName" id="username" inputType="text" more={{
                ...register("username", { required: 'UserName is required', minLength: 1 })
            }}>
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </AuthFormInput>

            {/* Password Input */}
            <AuthFormInput label="Password" id="password" inputType="password" more={{
                ...register("password", { required: 'Password is required', minLength: 1 })
            }}>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </AuthFormInput>

            <div className={'flex items-center justify-evenly flex-row'}>
                <AuthFormInput buttonType={'submit'} buttonValue={"Login"}/>
                <AuthFormInput buttonType={'button'} buttonValue={"Register"} buttonClick={()=> redirect('/auth/register')} />
            </div>
        </form>
    );
}