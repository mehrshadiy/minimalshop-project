// @flow
import * as React from 'react';

type Props = {
    children: React.ReactNode;
    className?: React.HTMLAttributes<HTMLDivElement> | string;
};

export function Container({children, className}: Props) {
    return (
        <div className={`mx-auto max-w-[80vw]  ${className}`}>
            {children}
        </div>
    );
}