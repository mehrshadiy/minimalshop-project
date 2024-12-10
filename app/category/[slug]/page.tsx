// @flow
import * as React from 'react';
import {CategorySection} from "@/app/ui/sections/CategorySection";
import {BackBtn} from "@/app/ui/btn/BackBtn";

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function Page(props: Props) {

    const { slug } =await props.params;

    return (
        <>
            <BackBtn/>
            <CategorySection category={slug} link={false} />
        </>
    );
};