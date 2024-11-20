import React from "react";
import Link from "next/link";
import { FaListUl, FaPaperPlane, FaTimes } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";

import type { Heading } from "~/lib/content.server";
import { styled } from "~/stitches.config";

import { FormEvent, FormState, useSubscribe } from "../SubscribeInput";

export const MobileNavIsland = ({ headings }: { headings: Heading[] }) => {
  const id = React.useId();

  const [activeHeading, setActiveHeading] = React.useState("");
  const [headingListOpen, setHeadingListOpen] = React.useState(false);
  const [subscribing, setSubscribing] = React.useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const [subscribe, { state, dispatch }] = useSubscribe();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    subscribe(emailInputRef.current.value);
  };

  return (
    <Wrapper>
      {headingListOpen && (
        <HeadingList
          as={motion.ul}
          animate={{ y: 2, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          style={{ x: "-50%" }}
        >
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                data-level={heading.level}
                onClick={() => {
                  setHeadingListOpen(false);
                  setActiveHeading(heading.text);
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </HeadingList>
      )}
      <DynamicIsland>
        <Link href="/">
          <HomeLink>NaN</HomeLink>
        </Link>
        <motion.div
          animate={{ y: subscribing ? -32 : 0 }}
          onAnimationComplete={() => {
            if (subscribing) {
              emailInputRef.current?.focus();
            } else {
              emailInputRef.current?.blur();
            }
          }}
        >
          <IconWrapper onClick={() => setHeadingListOpen(!headingListOpen)}>
            {headingListOpen ? <FaTimes /> : <FaListUl />}
          </IconWrapper>
          <SubscribeWrapper hidden={!subscribing} onSubmit={handleSubmit}>
            <label htmlFor={`${id}-subscribe-input`}>Email</label>
            <EmailInput
              id={`${id}-subscribe-input`}
              type="email"
              ref={emailInputRef}
              onChange={() => dispatch(FormEvent.Change)}
            />
          </SubscribeWrapper>
        </motion.div>
        <SubscribeControlsWrapper
          animate={{ x: subscribing ? 0 : 32 }}
          initial={{ x: 32 }}
        >
          {state === FormState.Loading ? (
            <IconWrapper
              disabled
              as={motion.span}
              animate={{ rotate: 360 }}
              transition={{
                type: "tween",
                duration: 1,
                ease: "linear",
                repeat: Infinity,
              }}
              css={{ marginLeft: "auto" }}
            >
              <CgSpinner />
            </IconWrapper>
          ) : (
            <>
              {state === FormState.Start && (
                <IconWrapper
                  onClick={() => {
                    if (!subscribing) {
                      setSubscribing(true);
                      setHeadingListOpen(false);
                    } else {
                      subscribe(emailInputRef.current.value);
                    }
                  }}
                >
                  <FaPaperPlane />
                </IconWrapper>
              )}
              <IconWrapper
                onClick={() => {
                  setSubscribing(false);
                  dispatch(FormEvent.Change);
                }}
                disabled={!subscribing}
                css={{ marginLeft: "auto" }}
              >
                <FaTimes />
              </IconWrapper>
            </>
          )}
        </SubscribeControlsWrapper>
      </DynamicIsland>
    </Wrapper>
  );
};

const SubscribeControlsWrapper = styled(motion.div, {
  display: "flex",
  width: 64,
});

const SubscribeWrapper = styled("form", {
  height: 32,
  display: "flex",
  alignItems: "center",
  gap: "$2",
  fontSize: "$sm",

  variants: {
    hidden: {
      true: {
        opacity: 0,
        pointerEvents: "none",
      },
    },
  },
});

const EmailInput = styled("input", {
  border: "1px solid $gray8",
  background: "$gray4",
  borderRadius: 4,
  padding: 6,
  transform: "translateY(-1px)",

  "&:focus": {
    borderColor: "$blue8",
  },
});

const Wrapper = styled("div", {
  position: "relative",
});

const TopNav = styled("div", {
  position: "absolute",
  bottom: "100%",
  left: "50%",
  width: "calc(100% - $space$4)",
  maxWidth: 500,
  padding: "$4",
  borderTopLeftRadius: "$base",
  borderTopRightRadius: "$base",
  boxShadow: "$md",
});

const SuccessText = styled(TopNav, {
  background: "$green4",
  border: "1px solid $green6",
  color: "$green11",
  textAlign: "center",
});

const HeadingList = styled(motion.ul, {
  position: "absolute",
  bottom: "100%",
  left: "50%",
  width: "90vw",
  maxWidth: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  background: "$gray2",
  borderRadius: "$md",
  padding: "$4",
  margin: 0,
  listStyle: "none",
  boxShadow: "$lg",
  zIndex: 10,

  "li button": {
    width: "100%",
    textAlign: "left",
    padding: "$2 $4",
    background: "none",
    border: "none",
    borderRadius: "$sm",
    color: "$gray11",
    cursor: "pointer",
    fontSize: "$sm",
    transition: "all 0.2s",

    "&:hover": {
      background: "$gray4",
    },

    "&[data-level='1']": {
      paddingLeft: "$4",
    },
    "&[data-level='2']": {
      paddingLeft: "$8",
    },
    "&[data-level='3']": {
      paddingLeft: "$12",
    },
    "&[data-level='4']": {
      paddingLeft: "$16",
    },
  },
});

const HeadingButton = styled("button", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
  height: 32,
  padding: "0 $2",
  borderRadius: "$base",

  "&:hover": {
    backgroundColor: "$gray6",
  },

  variants: {
    hidden: {
      true: {
        opacity: 0,
        pointerEvents: "none",
      },
    },
  },
});

export const DynamicIsland = styled("nav", {
  position: "relative",
  background: "$gray3",
  border: "1px solid $gray8",
  boxShadow: "$md",
  borderRadius: "$lg",
  padding: "$2",
  display: "flex",
  justifyContent: "space-between",
  color: "$gray11",
  height: `calc(32px + $space$4)`,
  overflow: "hidden",
});

const HomeLink = styled("a", {
  fontFamily: "$serif",
  fontWeight: 600,
  height: "100%",
  paddingLeft: "$2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translateY(1px)",
  cursor: "pointer",

  "&:hover": {
    color: "$blue9",
  },
});

const IconWrapper = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: 32,
  height: 32,
  borderRadius: "$base",

  "&:hover": {
    background: "$gray6",
  },

  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
      },
    },
  },
});
