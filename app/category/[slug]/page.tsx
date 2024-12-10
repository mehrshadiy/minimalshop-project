// @flow
import * as React from 'react';
import {CategorySection} from "@/app/ui/sections/CategorySection";
import {BackBtn} from "@/app/ui/btn/BackBtn";

type Props = {
    params: Promise<{
        id: string
    }>
};

export default async function Page(props: Props) {

    const params = await props.params
    const slug = params.id // Access id directly from params

    return (
        <>
            <BackBtn/>
            <CategorySection category={slug} link={false} />
        </>
    );
};