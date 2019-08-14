import Link from "next/link";
import {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem
} from "./footer.styles";

function Footer() {
  return (
    <StyledFooterOuter>
      <StyledFooterInner>
        <StyledFooter>
          <StyledFooterList>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
            <StyledFooterListItem>
              <Link href="/">
                <a>Item</a>
              </Link>
            </StyledFooterListItem>
          </StyledFooterList>
        </StyledFooter>
      </StyledFooterInner>
    </StyledFooterOuter>
  );
}

export default Footer;
