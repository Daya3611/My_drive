"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { avatarPlaceholderUrl, navItems } from '../../constants'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

function Sidebar({fullName, email}: Props) {
    const  pathname  = usePathname();
  return (
    <aside className='sidebar'>
        <Link href='/'>
            <Image src='assets/icons/logo-full-brand.svg' alt='home' width={160} height={50} className='hidden h-auto lg:block' />

            <Image src='assets/icons/logo-brand.svg' alt='home' width={52} height={52} className='lg:hidden block' />
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex flex-1 flex-col gap-6'>
                {navItems.map((items, index) => {
                    const active = pathname === items.url;

                    return (
                        <Link href={items.url} key={index} className='lg:w-full'>
                            <li className={cn("sidebar-nav-item" , pathname === items.url && "shad-active" )}>
                                <Image src={items.icon} alt={items.name} width={24} height={24} className={cn('nav-icon', pathname === items.url && 'nav-icon-active')} />
                                <p className='hidden lg:block'>{items.name}</p>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </nav>

        <Image src="/assets/images/files-2.png" alt='logo' width={506} height={418} className='w-full'></Image>
        
        <div className='sidebar-user-info'>
                <Image src={avatarPlaceholderUrl} alt='avatar' width={44} height={44} className='sidebar-user-avatar'></Image>

                <div className='hidden lg:block'>
                    <p className='subtitle-2 capitalize'>{fullName}</p>
                    <p className='subtitle-2 text-light-100'>{email}</p>
                </div>
        </div>

    </aside>
  )
}

export default Sidebar