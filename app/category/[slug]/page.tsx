// @flow
import * as React from 'react';
import {CategorySection} from "@/app/ui/sections/CategorySection";
import {BackBtn} from "@/app/ui/btn/BackBtn";
import {Suspense} from "react";

type Props = {
    params: Promise<{
        slug: string
    }>
};

export default async function Page(props: Props) {

    const params = await props.params
    const slug = params.slug // Access id directly from params

    return (
        <>
            <BackBtn/>
            <Suspense fallback={<div>Loading...</div>}>
            <CategorySection category={slug} link={false} />
            </Suspense>
        </>
    );
};