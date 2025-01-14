import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  content: string;
  className?: string;
  onClick?: () => void;
}

export default function CustomButton({
  content,
  className,
  onClick,
}: CustomButtonProps) {
  return (
    <Button
      className={`bg-[#7c3aed] text-white px-4 py-2 rounded-sm hover:bg-[#8b5cf6] transition-colors duration-300 font-semibold ${
        className || ""
      }`}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
