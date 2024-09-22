import Logo from '../../../assets/MovieSVG.svg';
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../Movie-TV/Images/cn";
export interface ViewMoreProps {
    className?: string;
    href: string;
}


function ViewMore(props: Readonly<ViewMoreProps>) {
    return (
        <Link
            href={props.href}
            className={cn(props.className ?? '', 'me-16 flex flex-col h-[463px] w-[252px] rounded-sm justify-center items-center bg-black-100 hover:bg-neutral-900 transition delay-50 ease-in-out')}>
            <Image src={Logo} width={128} height={128} alt='Movie Logo' />
            <p className='text-2xl font-bold text-center text-neutral-300'>View More</p>
        </Link>
    )
}

export default ViewMore;