import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '~/stitches.config';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of project 1',
    image: '/favicon.ico', // Replace with actual project image
    link: 'https://project1.com'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description of project 2',
    image: '/favicon.ico', // Replace with actual project image
    link: 'https://project2.com'
  },
  // Add more projects as needed
];

const ProjectsContainer = styled('div', {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
});

const CarouselButton = styled('button', {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  zIndex: 10,
  
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.7)',
  },
  
  '&.prev': {
    left: '1rem',
  },
  
  '&.next': {
    right: '1rem',
  }
});

const ProjectSlide = styled(motion.div, {
  width: '100%',
  height: '400px',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const ProjectTitle = styled('h2', {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#333',
});

const ProjectDescription = styled('p', {
  fontSize: '1.1rem',
  marginBottom: '1.5rem',
  color: '#666',
  textAlign: 'center',
  maxWidth: '600px',
});

const ProjectLink = styled('a', {
  color: '#0070f3',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ProjectPage = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + projects.length) % projects.length;
    setPage([newPage, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <Head>
        <title>Projects - NotANumber</title>
        <meta name="description" content="View our featured projects" />
      </Head>
      
      <ProjectsContainer>
        <AnimatePresence initial={false} custom={direction}>
          <ProjectSlide
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <Image
              src={projects[page].image}
              alt={projects[page].title}
              width={200}
              height={200}
              style={{ marginBottom: '1.5rem' }}
            />
            <ProjectTitle>{projects[page].title}</ProjectTitle>
            <ProjectDescription>{projects[page].description}</ProjectDescription>
            <ProjectLink href={projects[page].link} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          </ProjectSlide>
        </AnimatePresence>

        <CarouselButton className="prev" onClick={() => paginate(-1)}>
          <ChevronLeft size={24} />
        </CarouselButton>
        <CarouselButton className="next" onClick={() => paginate(1)}>
          <ChevronRight size={24} />
        </CarouselButton>
      </ProjectsContainer>
    </>
  );
};

export default ProjectPage;
