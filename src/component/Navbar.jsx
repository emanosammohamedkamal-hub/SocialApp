import React, { useContext } from 'react'
import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
    Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/Authcontext';
 export default function Navbar() {
     const navigate= useNavigate()
    let{settoken,user}= useContext(authContext)

  function logout(){
    localStorage.removeItem("token")
     settoken(null)
  }
  return (
      <NavbarComponent isBordered>
      <NavbarContent justify="start">

        <NavbarBrand className="mr-4">
          <Link to="/"><p className="hidden sm:block font-bold text-inherit">Circle</p></Link>
          </NavbarBrand>
 
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
         
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user&&user.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
               <Link to="/profile"><p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user&&user.name}</p></Link>
            </DropdownItem>
             
            <DropdownItem onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NavbarComponent>
   )
}
