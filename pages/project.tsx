import React from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { styled } from '~/stitches.config';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { Row } from '~/components/layout/Row';
import { BackArrow } from '~/components/BackArrow';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ProjectNavigation } from '~/components/ProjectNavigation';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of project 1',
    image: '/favicon.ico',
    link: 'https://project1.com'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description of project 2',
    image: '/favicon.ico',
    link: 'https://project2.com'
  }
];

const Wrapper = styled('div', {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$8',
});

const ContentWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
});

const NavWrapper = styled('nav', {
  position: 'fixed',
  top: '$8',
  left: '$8',
  color: '$gray11',

  a: {
    textDecoration: 'none',
  },
});

const LinkWrapper = styled('div', {
  fontFamily: '$serif',
  fontSize: '$xl',

  a: {
    color: '$gray11',
  },
});

const ProjectsList = styled('ul', {
  fontFamily: '$mono',
  fontSize: '$sm',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const ProjectItem = styled(Link, {
  color: '$gray11',
  variants: {
    active: {
      true: {
        color: '$gray12',
      },
    },
  },
});

const ProjectContainer = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
});

const ProjectDisplay = styled(motion.div, {
  width: '100%',
  margin: '0 auto',
  padding: '2rem 4rem',
  background: '$gray4',
  borderRadius: '$base',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const ProjectTitle = styled('h2', {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '$gray12',
});

const ProjectDescription = styled('p', {
  fontSize: '1.1rem',
  marginBottom: '1.5rem',
  color: '$gray11',
  textAlign: 'center',
  maxWidth: '600px',
});

const ProjectLink = styled('a', {
  color: '$blue9',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ProjectPage = () => {
  const [currentProject, setCurrentProject] = React.useState(0);
  const router = useRouter();
  const controls = useAnimation();

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Wrapper>
      <Head>
        <title>Projects - NotANumber</title>
        <meta name="description" content="View our featured projects" />
      </Head>
      
      <ContentWrapper>
        <Row as={NavWrapper} css={{ flexDirection: 'column', gap: '$4' }}>
          <LinkWrapper>
            <BackArrow />
          </LinkWrapper>
          <ProjectsList>
            {projects.map((project, index) => (
              <li key={project.id}>
                <ProjectItem 
                  href="#" 
                  active={currentProject === index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentProject(index);
                  }}
                >
                  {'> project-' + (index + 1)}
                </ProjectItem>
              </li>
            ))}
          </ProjectsList>
        </Row>

        <ProjectContainer>
          <ProjectNavigation
            onPrevious={prevProject}
            onNext={nextProject}
          />
          <AnimatePresence mode="wait">
            <ProjectDisplay
              key={currentProject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={projects[currentProject].image}
                alt={projects[currentProject].title}
                width={200}
                height={200}
                style={{ marginBottom: '1.5rem' }}
              />
              <ProjectTitle>{projects[currentProject].title}</ProjectTitle>
              <ProjectDescription>{projects[currentProject].description}</ProjectDescription>
              <ProjectLink href={projects[currentProject].link} target="_blank" rel="noopener noreferrer">
                View Project
              </ProjectLink>
            </ProjectDisplay>
          </AnimatePresence>
        </ProjectContainer>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProjectPage;
