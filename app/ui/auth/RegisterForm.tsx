'use client'

// @flow
import * as React from 'react';
import {useForm} from "react-hook-form";
import {RegisterFormType} from "@/app/lib/types/Types";
import {useUser} from "@/app/lib/context/UserContext";
import {redirect} from "next/navigation";
import {AuthFormInput} from "@/app/ui/auth/AuthFormInput";

export function RegisterForm() {

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormType>()
    const {authRegister} = useUser()

    const onSubmit = (data: RegisterFormType) => {
        authRegister({
            email: data.email,
            username: data.username,
            password: data.password,
            name: {firstname: data.name.firstname, lastname: data.name.lastname},
            address: {
                city: data.address.city,
                street: data.address.street,
                number: data.address.number,
                zipcode: data.address.zipcode,
                geolocation: {lat: data.address.geolocation.lat, long: data.address.geolocation.long}
            },
            phone: data.phone
        })
        redirect('/')
    }


    return (
        <form
            className={'w-fit max-w-[80vw] bg-white mx-auto flex flex-col gap-5 md:gap-6 p-10 rounded-lg'}
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Email Input */}
            <AuthFormInput label="Email" id="email" inputType="email" more={{
                ...register("email", {required: 'Email is required', minLength: 1})
            }}>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </AuthFormInput>

            {/* Password Input */}
            <AuthFormInput label="Password" id="password" inputType="password" more={{
                ...register("password", {required: 'Password is required', minLength: 1})
            }}>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </AuthFormInput>

            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                <AuthFormInput label="First Name" id="firstname" inputType="text" more={{
                    ...register("name.firstname", {required: 'First name is required'})
                }}>
                    {errors.name?.firstname && <p className="text-red-500">{errors.name.firstname.message}</p>}
                </AuthFormInput>
                <AuthFormInput label="Last Name" id="lastname" inputType="text" more={{
                    ...register("name.lastname", {required: 'Last name is required'})
                }}>
                    {errors.name?.lastname && <p className="text-red-500">{errors.name.lastname.message}</p>}
                </AuthFormInput>
            </div>

            {/* Address Details */}
            <div className="flex gap-4 flex-wrap">
                <AuthFormInput label="City" id="city" inputType="text" more={{
                    ...register("address.city", {required: 'City is required'})
                }}>
                    {errors.address?.city && <p className="text-red-500">{errors.address.city.message}</p>}
                </AuthFormInput>
                <AuthFormInput label="Street" id="street" inputType="text" more={{
                    ...register("address.street", {required: 'Street is required'})
                }}>
                    {errors.address?.street && <p className="text-red-500">{errors.address.street.message}</p>}
                </AuthFormInput>
                <AuthFormInput label="Number" id="number" inputType="number" more={{
                    ...register("address.number", {required: 'Address number is required'})
                }}>
                    {errors.address?.number && <p className="text-red-500">{errors.address.number.message}</p>}
                </AuthFormInput>
                <AuthFormInput label="Zipcode" id="zipcode" inputType="text" more={{
                    ...register("address.zipcode", {required: 'Zipcode is required'})
                }}>
                    {errors.address?.zipcode && <p className="text-red-500">{errors.address.zipcode.message}</p>}
                </AuthFormInput>
            </div>

            {/* Geolocation */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                <AuthFormInput label="Latitude" id="lat" inputType="text" more={{
                    ...register("address.geolocation.lat", {required: 'Latitude is required'})
                }}>
                    {errors.address?.geolocation?.lat &&
                        <p className="text-red-500">{errors.address.geolocation.lat.message}</p>}
                </AuthFormInput>
                <AuthFormInput label="Longitude" id="long" inputType="text" more={{
                    ...register("address.geolocation.long", {required: 'Longitude is required'})
                }}>
                    {errors.address?.geolocation?.long &&
                        <p className="text-red-500">{errors.address.geolocation.long.message}</p>}
                </AuthFormInput>
            </div>

            {/* Phone */}
            <AuthFormInput label="Phone" id="phone" inputType="tel" more={{
                ...register("phone", {required: 'Phone number is required'})
            }}>
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </AuthFormInput>

            {/* Submit Button */}
            <div className={'flex items-center justify-evenly flex-row'}>
                <AuthFormInput buttonType={'submit'} buttonValue={"Register"}/>
                <AuthFormInput buttonType={'button'} buttonValue={"Login"}
                               buttonClick={() => redirect('/auth/login')}
                />
            </div>
        </form>
    );
}