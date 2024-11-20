import React, { useState } from "react";
import Head from "next/head";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from 'lucide-react';
import Link from "next/link";

import { styled } from "~/stitches.config";
import { BASE_URL } from "~/lib/config";
import { Post } from "~/components/Post";
import { DynamicIsland } from "~/components/MobileNavIsland";

const posts = [
  {
    category: "Article",
    items: [
      {
        post: {
          slug: "blog-new1",
          title: "New article1",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new2",
          title: "New article2",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new3",
          title: "New article3",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new4",
          title: "New article4",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new5",
          title: "New article5",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new6",
          title: "New article6",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      },
      {
        post: {
          slug: "blog-new7",
          title: "New article7",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-29",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      }
    ]
  },
  {
    category: "Project",
    items: []
  },
  {
    category: "Other",
    items: [
      {
        post: {
          slug: "blog-new",
          title: "New article",
          description: "Exploring how to use the React key prop to power your Framer Motion animations.",
          editedAt: "2021-03-21",
        },
        children: <img src="/favicon.ico" alt="Description of the image" style={{ width: '100%', height: 'auto' }} />,
      }
    ]
  }
];

const NavBar = styled("nav", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$4 $8",
  borderBottom: "1px solid $gray6",
  backgroundColor: "$gray3",
  // height: "40px",
  
  "@lg": {
    padding: "$4 $16",
  }
});

const Logo = styled("div", {
  fontSize: "$xl",
  fontWeight: 500,
  marginRight: "$8",
  display: "flex",
  alignItems: "center"
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

const DropdownMenu = styled(motion.div, {
  position: "absolute",
  top: "100%",
  left: 0,
  backgroundColor: "$gray3",
  border: "1px solid $gray6",
  borderRadius: "4px",
  padding: "$2",
  minWidth: "200px",
  maxHeight: "200px",
  overflowY: "auto",
  overflowX: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  
  "&::-webkit-scrollbar": {
    width: "8px",
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "4px",
  },
  
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "$gray8",
    }
  },

  "& > *": {
    paddingRight: "4px",
  }
});

const DropdownItem = styled(Link, {
  display: "block",
  padding: "$2",
  color: "$gray11",
  textDecoration: "none",
  fontSize: "$base",
  transition: "all 0.2s",
  
  "&:hover": {
    backgroundColor: "$gray4",
    color: "$gray12",
    transform: "translateX(4px)"
  }
});

const NavItem = styled("div", {
  position: "relative",
  padding: "$2",
  color: "$gray11",
  cursor: "pointer",
  transition: "color 0.2s",

  "&:hover": {
    color: "$gray12",
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

const PopupSearchButton = styled(motion.button, {
  padding: "$2",
  border: "none",
  backgroundColor: "transparent",
  color: "$gray11",
  cursor: "pointer",
  transition: "color 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "$gray12",
  },
});

const SearchPopupOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

const SearchPopupCard = styled("div", {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  width: "90%",
  maxWidth: "600px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const SearchInputWrapper = styled("div", {
  display: "flex",
  gap: "12px",
  marginBottom: "20px",
  alignItems: "center",
});

const SearchInputContainer = styled("div", {
  position: "relative",
  flex: 1,
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled("input", {
  width: "100%",
  padding: "8px 12px",
  paddingRight: "36px",
  borderRadius: "6px",
  border: "none",
  fontSize: "16px",
  backgroundColor: "transparent",
  "&:focus": {
    outline: "none",
  },
});

const ClearButton = styled("button", {
  position: "absolute",
  right: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  padding: "4px",
  cursor: "pointer",
  color: "$gray11",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  "&:hover": {
    color: "$gray12",
    backgroundColor: "$gray4",
  },
});

const SearchPopupButton = styled("button", {
  background: "none",
  border: "none",
  padding: "4px",
  cursor: "pointer",
  color: "$gray11",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: "$gray12",
  },
});

const RecentArticlesGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
});

const RecentArticleCard = styled("div", {
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const postsPerPage = 5;
  
  // 将所有分类的文章合并为一个数组
  const allPosts = posts.reduce((acc, category) => [...acc, ...category.items], []);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  // 搜索文章的函数
  const searchPosts = () => {
    if (!searchValue.trim()) {
      // 按照编辑日期排序，返回最近的3篇文章
      return allPosts
        .sort((a, b) => new Date(b.post.editedAt).getTime() - new Date(a.post.editedAt).getTime())
        .slice(0, 3);
    }
    
    // 搜索结果也按日期排序
    const searchResults = allPosts
      .filter(post => post.post.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((a, b) => new Date(b.post.editedAt).getTime() - new Date(a.post.editedAt).getTime());

    return searchResults;
  };

  const searchResults = searchPosts();

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage === 1) {
        range.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        range.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return range;
  };

  return (
    <PageWrapper>
      <NavBar>
        <Logo>
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            style={{ 
              height: '40px',
              width: 'auto',  
              objectFit: 'contain'
            }} 
          />
        </Logo>
        <NavLinks>
          {posts.map(category => (
            <NavItem 
              key={category.category}
              onMouseEnter={() => setOpenCategory(category.category)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              {category.category}
              <AnimatePresence>
                {openCategory === category.category && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.items.map(item => (
                      <DropdownItem 
                        key={item.post.slug} 
                        href={`/${item.post.slug}`}
                      >
                        {item.post.title}
                      </DropdownItem>
                    ))}
                    {category.items.length === 0 && (
                      <div style={{ padding: "$2", color: "$gray9" }}>
                        No items available
                      </div>
                    )}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>
          ))}
        </NavLinks>
        <div style={{ marginLeft: 'auto' }}>
          <SearchButton onClick={() => setIsSearchOpen(true)}>
            <Search size={20} />
          </SearchButton>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SearchPopupOverlay onClick={() => setIsSearchOpen(false)}>
                  <SearchPopupCard onClick={(e) => e.stopPropagation()}>
                    <SearchInputWrapper>
                      <PopupSearchButton>
                        <Search size={20} />
                      </PopupSearchButton>
                      <SearchInputContainer>
                        <SearchInput
                          placeholder="Search articles..."
                          autoFocus
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                          <ClearButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchValue("");
                            }}
                            title="Clear search"
                          >
                            <X size={18} />
                          </ClearButton>
                        )}
                      </SearchInputContainer>
                    </SearchInputWrapper>
                    
                    <h3 style={{ marginBottom: "16px" }}>
                      {searchValue ? 'Search Results' : 'Recent Articles'}
                    </h3>
                    <RecentArticlesGrid>
                      {searchResults.map((article, index) => (
                        <RecentArticleCard
                          key={article.post.slug}
                          onClick={() => {
                            window.location.href = `/posts/${article.post.slug}`;
                          }}
                        >
                          {article.children}
                          <p style={{ 
                            margin: "8px 0",
                            fontSize: "14px",
                            fontWeight: "500"
                          }}>
                            {article.post.title}
                          </p>
                        </RecentArticleCard>
                      ))}
                      {searchValue && searchResults.length === 0 && (
                        <div style={{
                          gridColumn: "1 / -1",
                          textAlign: "center",
                          color: "$gray11",
                          padding: "20px"
                        }}>
                          No articles found
                        </div>
                      )}
                    </RecentArticlesGrid>
                  </SearchPopupCard>
                </SearchPopupOverlay>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NavBar>

      <Head>
        <title>Stereo Evolution Workshop</title>
        <meta
          name="description"
          content="A personal blog that dabbles in multiple areas without being proficient, by Zedd."
        />
        <meta name="author" content="Zedd" />
        <meta property="og:title" content="Stereo Evolution Workshop" />
        <meta
          property="og:description"
          content="A interactive blog that dabbles in multiple areas without being proficient, by Zedd."
        />
        <meta property="og:image" content={`${BASE_URL}/og/index.png`} />
        <meta property="og:url" content={BASE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ContentWrapper>
        <Posts>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentPosts.map((post, index) => (
              <Post
                key={post.post.slug}
                direction={index % 2 ? "right" : "left"}
                {...post}
              />
            ))}
          </motion.div>
        </Posts>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
          paginationRange={getPaginationRange()}
        />
        <Links>
          <SocialLinks />
        </Links>
      </ContentWrapper>
      <IslandWrapper>
        <DynamicIsland
          css={{
            borderRadius: "calc($radii$base + 4px)",
            height: "auto",
            display: "flex",
            alignItems: "center",
            color: "$gray12",
          }}
        >
          <MobileSocialWrapper>
            <SocialLinks />
          </MobileSocialWrapper>
        </DynamicIsland>
      </IslandWrapper>
    </PageWrapper>
  );
}

const SocialLinks = () => {
  return (
    <>
      <li>
        <a
          href="https://github.com/narendrasss/NotANumber"
          target="_blank"
          rel="noreferrer"
          aria-label="Github"
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/nandafyi"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </li>
    </>
  );
};

const MobileSocialWrapper = styled("ul", {
  display: "flex",
  gap: "$2",
  padding: "0 $2",
  listStyle: "none",
  fontSize: "$xl",
  transform: "translateY(3px)",

  a: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      color: "$blue9",
    },
  },
});

const IslandWrapper = styled("div", {
  position: "fixed",
  bottom: "$4",
  left: "$4",
  right: "$4",
  height: "auto",

  "@md": {
    display: "none",
  },
});

const SubscribeWrapper = styled("div", {
  display: "none",

  "@md": {
    display: "block",
  },
});

const Links = styled(motion.ul, {
  fontSize: "$xl",
  gap: "$4",
  listStyle: "none",
  position: "absolute",
  bottom: "$4",
  right: "$4",
  display: "flex",
  zIndex: 10,

  a: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      color: "$blue9",
    },
  },
});

const PageWrapper = styled("main", {
  $$gap: "$space$16",
  width: "100%",
  margin: "0",
  paddingBottom: "calc($$gap + $space$16)",
  position: "relative",

  "@lg": {
    paddingBottom: "calc($$gap + $space$24)",
  },
});

const ContentWrapper = styled("div", {
  maxWidth: "72rem",
  margin: "0 auto",
  padding: "0 $8",
  marginTop: "$12",
  
  "@lg": {
    padding: "0 $16",
  }
});

const Title = styled("h1", {
  fontFamily: "$serif",
  fontSize: "3rem",
  lineHeight: "$title",
  fontWeight: 500,

  span: {
    display: "block",
    fontSize: "$sm",
    fontFamily: "$sans",
    color: "$gray11",
    textAlign: "center",
    marginTop: "$2",
  },
});

const Header = styled("header", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "$12 0",
  marginBottom: "calc($$gap / 2)",

  "@md": {
    marginBottom: "$$gap",
    justifyContent: "space-between",
  },
});

const Posts = styled(motion.ul, {
  gridColumn: 2,

  "> :not(:last-child)": {
    marginBottom: "$$gap",
  },
});

const Pagination = ({ currentPage, totalPages, onPageChange, paginationRange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <PaginationWrapper>
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        上一页
      </button>
      {paginationRange.map((page) => (
        <button 
          key={page} 
          onClick={() => handlePageChange(page)} 
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        下一页
      </button>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  margin: "$4 0",
  
  button: {
    margin: "0 $2",
    padding: "$2 $4",
    cursor: "pointer",
    border: "1px solid $gray",
    borderRadius: "$radii$base",
    backgroundColor: "transparent",
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&:hover:not(:disabled)": {
      backgroundColor: "$blue9",
      color: "white",
    },
  },
});
