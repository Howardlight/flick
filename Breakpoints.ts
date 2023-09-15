"use client";
import { ReactElement } from "react"
import { useMediaQuery } from "react-responsive"

export const Desktop = ({ children }: { children: ReactElement }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

export const Tablet = ({ children }: { children: ReactElement }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}

export const Mobile = ({ children }: { children: ReactElement }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}

export const Default = ({ children }: { children: ReactElement }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
}