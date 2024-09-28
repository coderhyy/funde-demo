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
    <header className="fixed top-0 left-0 right-0">
      <div className="container m-auto mt-4">
        <NavigationMenu>
          <NavigationMenuList className="grid-cols-3 gap-2">
            <NavigationMenuItem>
              <Button onClick={() => toPage("/search")} variant="ghost">
                Search
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button onClick={() => toPage("/")} variant="ghost">
                Home
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
export default Head;
