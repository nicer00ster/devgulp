import { useRouter } from "next/router";
import Link from "next/link";
import { StyledMenuItem } from "./header.styles";

function EnhancedLink({ children, href }) {
  const router = useRouter();
  let activeClass = router.pathname === href ? "active-route" : "";

  function handleClick(e) {
    e.preventDefault();
    router.push(href);
  }

  return (
    <StyledMenuItem onClick={handleClick}>
      <Link scroll={false} prefetch href={href}>
        <a className={activeClass}>{children}</a>
      </Link>
    </StyledMenuItem>
  );
}

export default EnhancedLink;
