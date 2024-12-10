'use client'

// @flow
import * as React from 'react';
import {useDebounce} from "use-debounce";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


export function SearchForm() {

    const {register, watch, handleSubmit} = useForm()

    const SearchBar = watch('SearchBar')

    const [debouncedSearchBar] = useDebounce(SearchBar, 500)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
    }, [debouncedSearchBar]);


    return (
            <form onSubmit={handleSubmit(onSubmit)} className={'mx-auto max-w-[80vw] items-center text-start flex flex-col w-fit gap-1 mb-2.5'}>
                <label htmlFor="SearchBar" className={'text-[#60695c] block'}>
                    Search Item
                </label>
                <input id={'SearchBar'} type={'text'} {...register('SearchBar')}
                       placeholder={'Apple Watch, Samsung S21, Macbook Pro, ...'}
                       className={'w-[50vw] p-2 rounded-xl drop-shadow-xl shadow-2xl'}/>
                {
                    debouncedSearchBar &&
                    <p className={'w-[50vw] p-4 rounded-xl drop-shadow-xl shadow-2xl'}>
                        Since the FakeStore API does not support filtering by title, I initially fetched all products
                        and then filtered them by their title. However, this approach negatively impacted the site&#39;s
                        performance. Therefore, I replaced it with this text and focused on making such replacements
                        only where absolutely necessary
                    </p>
                }
            </form>

    );
}