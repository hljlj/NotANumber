import React from 'react';
import { styled } from '~/stitches.config';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeToggle } from '~/components/ThemeToggle';
import { BackArrow } from '~/components/BackArrow';

const OtherPage = () => {
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
          {/* 在这里添加你的内容 */}
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
  maxWidth: 1200,
  margin: '0 auto',
});

const ContentContainer = styled('main', {
  width: '100%',
  background: '$gray2',
  borderRadius: '$base',
  padding: '$6',
  marginTop: '$8',
  boxShadow: '$sm',
});

export default OtherPage;