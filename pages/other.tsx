import React, { useRef, useEffect } from 'react';
import { styled } from '~/stitches.config';
import { motion, useAnimationControls } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeToggle } from '~/components/ThemeToggle';
import { BackArrow } from '~/components/BackArrow';
import { Card } from '@douyinfe/semi-ui';

interface PlatformCard {
  platform: string
  followers?: string
  views?: string
  videos?: string
  likes?: string
  movies?: string
  books?: string
  games?: string
  description: string
  gradient: string
}

const cards: PlatformCard[] = [
  {
    platform: "Twitter",
    description: "News and updates about my",
    gradient: "from-emerald-500/80 to-emerald-700/80",
  },
  {
    platform: "数字游牧人",
    followers: "99,883",
    views: "3,821,585",
    videos: "59",
    description: "Through vivid narratives, I share my reflections on software engineering, explore the depths of technology.",
    gradient: "from-rose-600/90 to-rose-800/90",
  },
  {
    platform: "游戏游牧人",
    followers: "14,194",
    views: "2,623,257",
    videos: "12",
    description: "I'm not only playing games. I treat video games as an experiment.",
    gradient: "from-indigo-600/90 to-indigo-800/90",
  },
];

const getTopRowGradient = (index: number) => {
  return index % 2 === 0
    ? 'linear-gradient(to bottom right, #ff4d4d, #ff1a1a)'  // 红色
    : 'linear-gradient(to bottom right, #ff9933, #ff8000)';  // 橙色
};

const getBottomRowGradient = (index: number) => {
  return index % 2 === 0
    ? 'linear-gradient(to bottom right, #ffcc00, #ffb300)'  // 黄色
    : 'linear-gradient(to bottom right, #47d147, #33cc33)';  // 绿色
};

const OtherPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRowControls = useAnimationControls();
  const bottomRowControls = useAnimationControls();

  useEffect(() => {
    const animateCards = async () => {
      const cardWidth = 350;
      const gap = 24;
      const singleWidth = cardWidth + gap;
      const totalWidth = cards.length * singleWidth;
      const duration = 20;

      const animate = async (controls: any, direction: 1 | -1) => {
        controls.start({
          x: direction === -1 ? [-singleWidth, 0] : [0, -singleWidth],
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          },
        });
      };

      animate(topRowControls, -1);
      animate(bottomRowControls, 1);
    };

    animateCards();
  }, [topRowControls, bottomRowControls]);

  return (
    <Wrapper>
      <Head>
        <title>Other - NotANumber</title>
        <meta name="description" content="Other content page" />
      </Head>
      
      <ContentWrapper>
        <NavBar>
          <BackArrow />
        </NavBar>
        
        <ContentContainer>
          <MainContent>
            <HeaderSection>
              <Title>
                I share stories about #programming, #gaming, #content-creation and #life on the Internet.
              </Title>
              <Subtitle>
                My stories have attracted{' '}
                <HighlightSpan>285,844</HighlightSpan> followers.
              </Subtitle>
              <QuoteBox>
                <Quote>
                  There are countless ways to tell a story about the world, this is mine.
                </Quote>
              </QuoteBox>
            </HeaderSection>

            <CardsContainer ref={containerRef}>
              <CardRow
                animate={topRowControls}
                style={{
                  marginTop: '0.875rem',
                  display: 'flex',
                  gap: '24px',
                }}
              >
                {[...cards, ...cards, ...cards, ...cards].map((card, index) => (
                  <StyledCard
                    key={`top-${index}`}
                    title={card.platform}
                    style={{
                      width: 350,
                      background: getTopRowGradient(index),
                    }}
                  >
                    <CardContent>
                      <StatsSection>
                        {card.followers && <Stat>{card.followers} followers</Stat>}
                        {card.views && <Stat>{card.views} views</Stat>}
                        {card.videos && <Stat>{card.videos} videos</Stat>}
                      </StatsSection>
                      <Description>{card.description}</Description>
                    </CardContent>
                  </StyledCard>
                ))}
              </CardRow>

              <CardRow
                animate={bottomRowControls}
                style={{
                  marginBottom: '0.875rem',
                  display: 'flex',
                  gap: '24px',
                }}
              >
                {[...cards, ...cards, ...cards, ...cards].map((card, index) => (
                  <StyledCard
                    key={`bottom-${index}`}
                    title={card.platform}
                    style={{
                      width: 350,
                      background: getBottomRowGradient(index),
                    }}
                  >
                    <CardContent>
                      <StatsSection>
                        {card.followers && <Stat>{card.followers} followers</Stat>}
                        {card.views && <Stat>{card.views} views</Stat>}
                        {card.videos && <Stat>{card.videos} videos</Stat>}
                      </StatsSection>
                      <Description>{card.description}</Description>
                    </CardContent>
                  </StyledCard>
                ))}
              </CardRow>
            </CardsContainer>
          </MainContent>
        </ContentContainer>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$8',
  background: '$gray4',
  color: '$gray12',
});

const NavBar = styled('nav', {
  position: 'fixed',
  top: '$8',
  left: '$8',
  color: '$gray11',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  zIndex: 10,
});

const ContentWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const ContentContainer = styled('div', {
  padding: '2rem',
});

const MainContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const HeaderSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 600,
  '@media (min-width: 640px)': {
    fontSize: '2.5rem',
  },
});

const Subtitle = styled('p', {
  fontSize: '1.5rem',
  '@media (min-width: 640px)': {
    fontSize: '2rem',
  },
});

const HighlightSpan = styled('span', {
  color: '#f97316',
  fontWeight: 600,
});

const QuoteBox = styled('div', {
  backgroundColor: 'rgba(251, 146, 60, 0.1)',
  padding: '1rem',
  borderRadius: '0.5rem',
});

const Quote = styled('p', {
  fontSize: '1.25rem',
  color: '#fed7aa',
  '@media (min-width: 640px)': {
    fontSize: '1.5rem',
  },
});

const CardsContainer = styled('div', {
  position: 'relative',
  height: '450px',
  padding: '1.5rem 0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.875rem',
});

const CardRow = styled(motion.div, {
  display: 'flex',
  gap: '1.5rem',
  position: 'relative',
  left: 0,
});

const StyledCard = styled(Card, {
  flexShrink: 0,
  height: '200px',
  padding: '1.5rem',
  color: 'white',
});

const CardContent = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StatsSection = styled('div', {
  flexGrow: 1,
});

const Stat = styled('p', {
  fontSize: '0.875rem',
});

const Description = styled('p', {
  fontSize: '0.875rem',
  opacity: 0.9,
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
});

export default OtherPage;