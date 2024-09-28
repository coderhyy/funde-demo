import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();
  const toPage = (path: string) => {
    navigate(path);
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      <div className="cursor-pointer text-2xl font-bold" onClick={() => toPage("/")}>
        Logo
      </div>
      <NavigationMenu>
        <NavigationMenuList className="grid-cols-3 gap-2">
          <NavigationMenuItem>
            <Button onClick={() => toPage("/")} variant="ghost">
              Home
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button onClick={() => toPage("/search")} variant="ghost">
              Search
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <Button onClick={() => toPage("/login")}>Login</Button>
      </div>
    </header>
  );
};
export default Head;
