import { useSidebar } from './sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SidebarTrigger = () => {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle sidebar"
      className="sm:hidden"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};

export default SidebarTrigger;
