import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import Logo from "@/assets/navlogo.png";
import { BsCartCheckFill } from "react-icons/bs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react"; // Import an icon for the toggle button

export default function Navbar() {
  const data = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Products",
      path: "/allproducts",
    },
    {
      id: 3,
      name: "Categories",
      path: "/allcategories",
    },
    {
      id: 4,
      name: "FAQ",
      path: "/faq",
    },
    // {
    //   id: 3,
    //   name: "About",
    //   path: "/about",
    // },
    // {
    //   id: 4,
    //   name: "Contact",
    //   path: "/contact",
    // },
    {
      id: 5,
      name: <BsCartCheckFill className="text-2xl" />,
      path: "/cart",
    },
  ];

  return (
    <div className="mx-auto container">
      <div className="flex  items-center justify-between border-b-2 lg:p-0 gap-2">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14 md:h-20 mt-2" />
        </Link>

        {/* large and medium screens */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex ">
            {data.map((item) => (
              <NavigationMenuItem key={item.id}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-lg font-bold sm:text-base`}
                  >
                    {typeof item.name === "string" ? item.name : item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/*  small devices */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <Menu className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {data.map((item) => (
                <DropdownMenuItem key={item.id} asChild className="text-xs text-green-900 font-medium">
                  <Link to={item.path}>
                    {typeof item.name === "string" ? item.name : item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
