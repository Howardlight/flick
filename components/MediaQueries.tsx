"use client";
import { ReactElement, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive'

export const Desktop = ({ children }: { children: any }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
export const Tablet = ({ children }: { children: any }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
export const Mobile = ({ children }: { children: any }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}
export const Default = ({ children }: { children: any }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
}