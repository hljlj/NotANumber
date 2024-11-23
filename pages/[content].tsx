import React from "react";
import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import { getMDXComponent } from "mdx-bundler/client";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';

import { getAllPosts, getPost, type Post, type Heading } from "~/lib/content.server";
import { BASE_URL } from "~/lib/config";
import { darkTheme, styled } from "~/stitches.config";

import { Heading as HeadingComponent, Subheading, SubSubheading } from "~/components/Heading";
import { OrderedList } from "~/components/OrderedList";
import { NewsletterForm } from "~/components/NewsletterForm";
import { Link } from "~/components/Link";
import { Content } from "~/components/Content";

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      content: await getPost(context.params?.content as string),
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { content: post.slug } })),
    fallback: false,
  };
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  day: "numeric",
});

interface TreeNode extends Heading {
  children: TreeNode[];
}

const buildHeadingTree = (headings: Heading[]): TreeNode[] => {
  const root: TreeNode[] = [];
  const stack: TreeNode[] = [];

  headings.forEach(heading => {
    const node: TreeNode = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return root;
};

const NavHeading = ({ heading, onHeadingClick }: { heading: TreeNode; onHeadingClick: (id: string) => void }) => {
  const level = Math.min(heading.level - 1, 3);

  return (
    <NavItem>
      <NavItemContent>
        <NavLink 
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            onHeadingClick(heading.id);
          }}
          data-level={level}
        >
          {heading.text}
        </NavLink>
      </NavItemContent>
      {heading.children.length > 0 && (
        <NavList data-level={level}>
          {heading.children.map((child) => (
            <NavHeading
              key={child.id}
              heading={child}
              onHeadingClick={onHeadingClick}
            />
          ))}
        </NavList>
      )}
    </NavItem>
  );
};

export default function PostPage({ content }: { content: Post }) {
  const PostContent = React.useMemo(
    () => getMDXComponent(content.code),
    [content.code]
  );
  const { frontmatter, headings, slug } = content;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const router = useRouter();
  const controls = useAnimation();

  return (
    <PageWrapper>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="author" content="Nanda Syahrasyad" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`${BASE_URL}/og/${slug}.png`} />
        <meta property="og:url" content={`${BASE_URL}/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Nav>
        <NavHeader>
          <motion.button
            onClick={() => {
              controls.start({
                x: "-150%",
                scale: 0.8,
                transition: {
                  duration: 0.4,
                  ease: [0.32, 0, 0.67, 0]
                }
              }).then(() => {
                router.push('/');
              });
            }}
            style={{ 
              fontSize: "2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              color: "var(--colors-gray11)",
              paddingRight: "1rem"
            }}
            whileHover={{
              color: "var(--colors-gray12)",
              x: -4,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              initial={{ x: 0, scale: 1 }}
              animate={controls}
            >
              <FaArrowLeft />
            </motion.div>
          </motion.button>
        </NavHeader>
        <NavList>
          {buildHeadingTree(headings).map((heading) => (
            <NavHeading
              key={heading.id}
              heading={heading}
              onHeadingClick={scrollToHeading}
            />
          ))}
        </NavList>
      </Nav>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Article as="article">
          <Header>
            <LastUpdated>
              {formatter.format(new Date(frontmatter.editedAt))}
            </LastUpdated>
            <Title>
              <Balancer>{frontmatter.title}</Balancer>
            </Title>
            <Blurb>
              <Balancer>{frontmatter.blurb}</Balancer>
            </Blurb>
          </Header>
          <PostContent
            components={{
              h2: HeadingComponent as any,
              h3: Subheading as any,
              h4: SubSubheading as any,
              ol: OrderedList as any,
              a: Link as any,
            }}
          />
          <NewsletterWrapper>
            <NewsletterForm />
          </NewsletterWrapper>
        </Article>
      </motion.div>
    </PageWrapper>
  );
}

const NavHeader = styled("h2", {
  fontFamily: "$serif",
  marginBottom: "$4",
});

const NavItem = styled("li", {
  listStyle: "none",
});

const NavItemContent = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$1",
});

const NavList = styled("ul", {
  padding: 0,
  margin: 0,
  marginTop: "$4",
  variants: {
    'data-level': {
      1: { marginLeft: "$4" },
      2: { marginLeft: "$8" },
      3: { marginLeft: "$12" }
    },
  },
});

const NavLink = styled("a", {
  color: "$gray11",
  textDecoration: "none",
  fontSize: "$sm",
  transition: "color 0.2s",
  "&:hover": {
    color: "$gray12",
  },
  variants: {
    'data-level': {
      0: { fontWeight: "600" },
      1: { fontWeight: "500" },
      2: { fontWeight: "400" },
      3: { fontWeight: "400", fontSize: "0.875rem" }
    },
  },
});

const NewsletterWrapper = styled("footer", {
  marginTop: "$24",
});

const Nav = styled("nav", {
  position: "fixed",
  top: "$16",
  bottom: "$16",
  color: "$gray11",
  maxWidth: "$40",
  display: "none",
  flexDirection: "column",
  paddingLeft: "$6",
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "$gray6 transparent",

  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$gray6",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "$gray8",
    },
  },

  "@media (min-width: 72rem)": {
    display: "flex",
  },

  h2: {
    fontFamily: "$serif",
  },

  a: {
    textDecoration: "none",
    color: "inherit",
    transition: "color 0.2s",

    "&:hover": {
      color: "$blue9",
    },
  },

  ul: {
    listStyle: "none",
    fontSize: "$sm",

    "> :not(:last-child)": {
      marginBottom: "$2",
    },
  },
});

const PageWrapper = styled("main", {
  width: `min(80rem, 100%)`,
  margin: "0 auto",
  padding: "$16 0",
});

const Title = styled("h1", {
  fontSize: "4rem",
  fontFamily: "$serif",
  lineHeight: "$title",
  fontWeight: 500,
});

const Blurb = styled("p", {
  fontSize: "$lg",
});

const LastUpdated = styled("p", {
  fontFamily: "$mono",
  color: "$gray10",
});

const Header = styled("header", {
  marginBottom: "$16",

  "> :not(:last-child)": {
    marginBottom: "$8",
  },
});

const Article = styled(Content, {
  lineHeight: "$body",
  maxWidth: 800,
  display: "grid",
  gridTemplateColumns: "min(100%, 65ch) 1fr",
  margin: "0 auto",
  padding: "0 $4",
  paddingBottom: "$12",

  "@media (min-width: 72rem)": {
    paddingBottom: "0",
  },
});
