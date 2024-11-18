import React from "react";
import { styled } from "~/stitches.config";
import Link from "next/link";
import { Search } from 'lucide-react';
import { motion } from "framer-motion";

const NavBar = styled("nav", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$4 $8",
  borderBottom: "1px solid $gray6",
  backgroundColor: "$gray3",
  
  "@lg": {
    padding: "$4 $16",
  }
});

const Logo = styled("div", {
  fontSize: "$xl",
  fontWeight: 500,
  marginRight: "$8",
});

const NavLinks = styled("div", {
  display: "flex",
  gap: "$8",
  
  a: {
    color: "$gray11",
    textDecoration: "none",
    fontSize: "$base",
    
    "&:hover": {
      color: "$gray12",
    }
  }
});

const SearchButton = styled(motion.button, {
  padding: "$2",
  border: "1px solid $gray",
  borderRadius: "50%",
  backgroundColor: "#E0E0E0",
  color: "white",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "#C0C0C0",
    transform: "scale(1.05)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});

const NavBarComponent = () => {
  return (
    <NavBar>
      <Logo>AngelList</Logo>
      <NavLinks>
        <Link href="#">Products</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Resources</Link>
      </NavLinks>
      <div style={{ marginLeft: 'auto' }}>
        <SearchButton>
          <Search className="w-5 h-5" />
        </SearchButton>
      </div>
    </NavBar>
  );
};

export default NavBarComponent; 