"use client";
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-separator';
import { navItems } from '../../constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import FileUploader from './FileUploader';
import { Button } from './ui/button';
import { signOutUser } from '@/lib/actions/users.actions';

interface Props {
    $id: string;
    ownerID: string;
    accountId: string;
    fullName: string;
    email: string;
    avatar: string;
    userId: string;
}
  
function MobileNavigation({$id:ownerID, accountId, fullName , email, avatar,userId}: Props) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
  return (
    <header className='mobile-header'>

        <Image src="/assets/icons/logo-brand.svg" alt="logo" width={120} height={52} className="h-auto"></Image>

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="w-6" />
            </SheetTrigger>
            <SheetContent className='shad-sheet h-screen px-3 '>
            
                <SheetTitle>
                    <div className='header-user'>
                        <Image src={avatar} alt='avatar' width={44} height={44} className='header-user-avatar' />
                        <div className='sm:hidden lg:block'>
                            <p className='subtitle-2 capitalize'>{fullName}</p>
                            <p className='caption'>{email}</p>
                        </div>
                    </div>
                    <Separator className='mb-4 bg-light-200/20' />
                </SheetTitle>
                {/* <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription> */}
                <nav className='mobile-nav'>
                    <ul className='mobile-nav-list'>
                    {navItems.map((items, index) => {
                    const active = pathname === items.url;

                        return (
                            <Link href={items.url} key={index} className='lg:w-full'>
                                <li className={cn("mobile-nav-item" , pathname === items.url && "shad-active" )}>
                                    <Image src={items.icon} alt={items.name} width={24} height={24} className={cn('nav-icon', pathname === items.url && 'nav-icon-active')} />
                                    <p className='lg:hidden block'>{items.name}</p>
                                </li>
                            </Link>
                        );
                    })}
                    </ul>
                </nav>
                <Separator className='my-5 bg-light-200/20'/>
                <div className='flex flex-col justify-between gap-5 pb-5'>
                <FileUploader ownerID={ownerID} accountId={accountId}  />
                    <Button type='submit' className='sign-out-button' onClick={ async () => await signOutUser()}>
                        <Image src='assets/icons/logout.svg' alt='logout' width={24} height={24}  />
                        <p>Logout</p>
                    </Button>
                    
                </div>
            </SheetContent>
        </Sheet>

    </header>
  )
}

export default MobileNavigation
