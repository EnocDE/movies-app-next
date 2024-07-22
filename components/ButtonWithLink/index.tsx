import { Button } from "@nextui-org/react";
import Link from "next/link";

interface WatchButtonProps {
  url: string;
  name: string;
  color?: "danger" | "primary" | "secondary" | "success" | "warning"
  classLink?: string
  classButton?: string
}

export default function ButtonWithLink(props: WatchButtonProps) {
  const { url, name, classButton, classLink } = props;
  const color = props.color || "default"
  
  return (
    <Link href={url} className={classLink}>
      <Button color={color} className={classButton}>{name}</Button>
    </Link>
  );
}
