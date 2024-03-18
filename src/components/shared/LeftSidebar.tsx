import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/src/context/AuthContext'
import { sidebarLinks } from '@/src/constants'
import { INavLink } from '@/src/types'
import Loader from './Loader'

const LeftSidebar = () => {

  const { mutate: signOut, isSuccess, isPending: isSignOutPending } = useSignOutAccount()
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess){
      navigate(0)
    }
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className=''>
          <img src="/assets/images/logo-dark-2.png" alt="logo"
          width={170}
          className='absolute top-4 left-[45px]'
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || "assets/icons/profile-placeholder.svg"} alt="" className='h-14 w-14 rounded-full
          '/>
          <div className='flex flex-col '>
            <p className="body-bold">
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          { sidebarLinks.map((link: INavLink) => {

            const isActive = pathname === link.route;
            return(
              <li
              key={link.label}
              className={`leftsidebar-link group ${ isActive && 'bg-primary-500' }`}
              >
                <NavLink
                to={link.route}
                className='flex gap-4 items-center p-4'
                >
                  <img src={link.imgURL} alt={link.label} 
                  className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          }) }
        </ul>

      </div>
      <Button variant='ghost' className='shad-button_ghost'
        onClick={() => signOut()}
      >
        {isSignOutPending ? (
          <div>
            <Loader />
          </div>
        ) : 
        (
          <img src="/assets/icons/logout.svg" alt="logout" />
        )}
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar