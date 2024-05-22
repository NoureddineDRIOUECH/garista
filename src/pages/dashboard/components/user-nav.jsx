import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "../../../components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../../../components/ui/avatar";
import { Button } from "./../../../components/ui/button";
import { useLogin } from "../../../../actions/Authentification/LoginProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getStaffById, getUserById } from "../../../../actions/User/CreateUser";
import { axiosInstance } from "../../../../axiosInstance";
import { APIURL } from "../../../../lib/ApiKey";

function UserNav() {
  const navigate = useNavigate();
  const [userDat, setUserDat] = useState([])
  const { getUser, logout } = useLogin();
  const idUser = sessionStorage.getItem('dataItem');
  const roleUser = sessionStorage.getItem('role');
  const userStaff = sessionStorage.getItem('dataStaff') 
  useEffect(() => {
    const getUserData = async () => {
      let role = JSON.parse(roleUser) 
      let userParss = JSON.parse(userStaff)
      const userItem = role == "user" ?  await getUserById(idUser) :  await getStaffById(userParss.id);
      console.log("The User Item => ", userItem, idUser, userParss);
      if(role == "user")
      {
        userItem.map(obj =>  {
          console.log("The Items => ", obj);
          setUserDat(obj)
        })
      }
      else{
        setUserDat(userItem)
      }
      // }
    };
  
    getUserData();
    console.log("THe id is djd", idUser)
  }, []);

  const handleLogout =async () => {

    const token = sessionStorage.getItem('tokenData');

    let tok = JSON.parse(token)
    window.localStorage.setItem('AUTHENTICATED', false)
    console.log("The token => ", tok);
      try {
        const response = await axiosInstance.post('/api/auth/logout', {}, {  // Empty data object for POST request
          headers: {
              'Authorization': `Bearer ${tok.token}`,  // Use template literals to include the token
              'Content-Type': 'application/json',  // Content-Type should be application/json for JSON data
          }
      });

      if (response.status === 200 || true) {
          console.log("The Response of Logout => ", response.data);
          sessionStorage.setItem('isLoggedIn', "not loggin");
          navigate('/login');
      } 
    }catch (error) {
        console.error('Error during login:', error);
      }
  }


  // const { isLoggedIn, login, logout } = useLogin();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
          <Avatar className="h-8 w-8">
            {
              userDat.image == null
              ?
              <>
              <AvatarImage src="/public/avatar.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
              </>
              : 
              <>
              <AvatarImage src={`${APIURL}/storage/${userDat.image}`} alt="@shadcn" />
              </>
            }
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userDat.first_name + ' ' + userDat.last_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userDat.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/Profile')}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer"  onClick={() => navigate('/Company')}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
