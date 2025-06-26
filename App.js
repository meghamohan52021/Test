import React, { useState, useEffect } from 'react';
import './App.css';
import {
  AppLayout,
  SideNavigation,
  Header,
  ContentLayout,
  Button,
  Input,
  Pagination,
  SpaceBetween,
  Box,
  Grid,
  Container,
  Icon,
  Checkbox,
  Cards,
  Textarea,
  TokenGroup
} from '@cloudscape-design/components';

const personas = [
  'Business Analyst', 'DevOps Engineer', 'Performance Engineer',
  'Product Owner', 'Site Reliability Engineer', 'Solutions Architect', 'System Engineer',
  'Technical Writers', 'Test Engineer', 'Testers (QA Engineers)', 'Project Manager',
  'Scrum Master', 'Product Manager', 'Technical Lead', 'UX/UI Designer', 'Create custom persona'
];

const capabilities = [
  'Project Management', 'Requirement Management', 'Architecture and Design', 'Collaboration',
  'DevSecOps', 'Operations and Maintenance', 'AI Assistants', 'Analytics and Insights',
  'Knowledge Management', 'Extensibility'
];

const patterns = [
  { id: 1, heading: 'DevOps and continuous delivery', description: 'Automated entire deployment pipelines', persona: 'DevOps Engineer' },
  { id: 2, heading: 'DevOps and continuous delivery', description: 'Receive near real-time feedback on code quality and potential issues', persona: 'Software developer' },
  { id: 3, heading: 'DevOps and continuous delivery', description: 'Receive near real-time security issues and remediation recommendations', persona: 'Software developer' },
  { id: 4, heading: 'DevOps and continuous delivery', description: 'Receive near real-time code and best practice suggestions', persona: 'Software developer' },
  { id: 5, heading: 'DevOps and continuous delivery', description: 'Automate repetitive tasks and integrate commands into scripts', persona: 'DevOps Engineer' },
  { id: 6, heading: 'DevOps and continuous delivery', description: 'Build code and generate artifacts automatically after each code commit', persona: 'Software developer' },
  { id: 7, heading: 'DevOps and continuous delivery', description: 'Build code according to the organization\'s standards and framework', persona: 'Software developer' },
  { id: 8, heading: 'DevOps and continuous delivery', description: 'Automatically run unit tests on every commit to catch errors early in the development process', persona: 'Software developer' },
  { id: 9, heading: 'DevOps and continuous delivery', description: 'Analyze the coverage of unit tests to make sure that all critical code paths are tested', persona: 'Software developer' },
  { id: 10, heading: 'DevOps and continuous delivery', description: 'Manage branches and merge changes', persona: 'Software developer' },
  { id: 11, heading: 'DevOps and continuous delivery', description: 'Manage code and artifact versioning', persona: 'Software developer' },
  { id: 12, heading: 'DevOps and continuous delivery', description: 'Store and manage build artifacts and dependencies', persona: 'DevOps Engineer' },
  { id: 13, heading: 'DevOps and continuous delivery', description: 'Resolve and fetch dependencies during the build process', persona: 'Software developer' },
  { id: 14, heading: 'DevOps and continuous delivery', description: 'Generate and run integration tests to make sure that components work together as expected', persona: 'Test Engineer' },
  { id: 15, heading: 'DevOps and continuous delivery', description: 'Use mock services during integration tests to simulate interactions with external systems', persona: 'Test Engineer' },
  { id: 16, heading: 'DevOps and continuous delivery', description: 'Benchmark application performance under different loads', persona: 'Performance Engineer' },
  { id: 17, heading: 'DevOps and continuous delivery', description: 'Simulate high-traffic scenarios to test the application\'s scalability and response times', persona: 'Performance Engineer' },
  { id: 18, heading: 'DevOps and continuous delivery', description: 'Test the system\'s ability to recover from failures, such as server crashes or network outages', persona: 'Site Reliability Engineer' },
  { id: 19, heading: 'DevOps and continuous delivery', description: 'Perform chaos engineering', persona: 'Site Reliability Engineer' },
  { id: 20, heading: 'DevOps and continuous delivery', description: 'Run tests to verify that the application meets the business requirements', persona: 'Testers (QA Engineers)' },
  { id: 21, heading: 'DevOps and continuous delivery', description: 'Conduct user acceptance testing', persona: 'Product Owner' },
  { id: 22, heading: 'DevOps and security', description: 'Scan code repositories for hardcoded secrets', persona: 'DevOps Engineer' },
  { id: 23, heading: 'Application performance monitoring', description: 'Continuously monitor application performance in near real time to detect and diagnose performance issues before they affect users', persona: 'Site Reliability Engineer' },
  { id: 24, heading: 'Log aggregation and analytics', description: 'Aggregate logs from multiple sources into a centralized system for easy searching and analysis in order to identify trends and issues', persona: 'Site Reliability Engineer' },
  { id: 25, heading: 'Issue management', description: 'Create and assign issues', persona: 'Project Manager' },
  { id: 26, heading: 'Issue management', description: 'Detect issues during testing and log them', persona: 'Test Engineer' },
  { id: 27, heading: 'Issue management', description: 'Prioritize issues based on severity and assign them to developers', persona: 'Project Manager' },
  { id: 28, heading: 'Issue management', description: 'Identify and merge duplicate issues', persona: 'Project Manager' },
  { id: 29, heading: 'Issue management', description: 'Track and generate reports about key issues, metrics, and overall health of the project', persona: 'Project Manager' },
  { id: 30, heading: 'Sprint and task management', description: 'Estimate effort for tasks and assign story points based on team capacity', persona: 'Scrum Master' },
  { id: 31, heading: 'Sprint and task management', description: 'Distribute tasks among team members for even workload across the sprint', persona: 'Scrum Master' },
  { id: 32, heading: 'Sprint and task management', description: 'Facilitate sprint planning sessions that align team efforts with sprint goals', persona: 'Scrum Master' },
  { id: 33, heading: 'Product backlog management', description: 'Reorder backlog items based on business value, urgency, and user feedback', persona: 'Product Owner' },
  { id: 34, heading: 'Product backlog management', description: 'Integrate new customer feedback and market insights into the product backlog for near real-time prioritization', persona: 'Product Owner' },
  { id: 35, heading: 'Product backlog management', description: 'Identify and manage dependencies between backlog items to streamline development', persona: 'Product Manager' },
  { id: 36, heading: 'User stories mapping', description: 'Create maps of user journeys to identify all necessary features and their corresponding user stories', persona: 'Product Owner' },
  { id: 37, heading: 'User stories mapping', description: 'Identify gaps or missing steps in the user flow', persona: 'Business Analyst' },
  { id: 38, heading: 'User stories mapping', description: 'Prioritize user stories based on their impact to the business value', persona: 'Product Manager' },
  { id: 39, heading: 'Reporting and analytics', description: 'Generate near real-time dashboards that visualize key project metrics, such as sprint velocity and issue resolution rates', persona: 'Project Manager' },
  { id: 40, heading: 'Reporting and analytics', description: 'Analyze historical data and predict future project outcomes, such as potential delays or bottlenecks', persona: 'Project Manager' },
  { id: 41, heading: 'Reporting and analytics', description: 'Create custom reports, such as team performance or project status reports, that are tailored to different stakeholders', persona: 'Project Manager' },
  { id: 42, heading: 'Product roadmap management', description: 'Create and maintain a product roadmap that outlines major milestones and release dates', persona: 'Project Manager' },
  { id: 43, heading: 'Product roadmap management', description: 'Update the roadmap based on changes in project priorities or timelines', persona: 'Project Manager' },
  { id: 44, heading: 'Product roadmap management', description: 'Share the roadmap with stakeholders to provide visibility into the product\'s direction', persona: 'Project Manager' },
  { id: 45, heading: 'Feedback loops', description: 'Collect feedback from the team after each sprint and identify areas for improvement', persona: 'Scrum Master' },
  { id: 46, heading: 'Retrospectives', description: 'Translate feedback into actionable items for the next sprint, driving continuous improvement', persona: 'Scrum Master' },
  { id: 47, heading: 'Retrospectives', description: 'Track the impact of changes implemented from previous retrospectives to measure their effectiveness', persona: 'Scrum Master' },
  { id: 48, heading: 'Business requirements', description: 'Create business requirements', persona: 'Business Analyst' },
  { id: 49, heading: 'Epic management', description: 'Create epics from features', persona: 'Product Owner' },
  { id: 50, heading: 'Epic management', description: 'Track the progress of an epic by monitoring the completion of its associated user stories', persona: 'Product Manager' },
  { id: 51, heading: 'User story management', description: 'Create user stories', persona: 'Product Owner' },
  { id: 52, heading: 'User story management', description: 'Estimate the effort required for each use story and assign story points', persona: 'Scrum Master' },
  { id: 53, heading: 'User story management', description: 'Define acceptance criteria for each user story', persona: 'Product Owner' },
  { id: 54, heading: 'Architecture documentation', description: 'Create an architecture document', persona: 'Solutions Architect' },
  { id: 55, heading: 'Design documentation', description: 'Create a detailed design document', persona: 'Technical Lead' },
  { id: 56, heading: 'Architecture analysis', description: 'Understand an existing architecture and design standards', persona: 'Solutions Architect' },
  { id: 57, heading: 'UI/UX design', description: 'Develop detailed mock-ups and prototypes of a user interface', persona: 'UX/UI Designer' }
];

const personaDescriptions = {
  'Business Analyst': 'Analyzes business processes and requirements to bridge the gap between business needs and technical solutions.',
  'DevOps Engineer': 'Manages infrastructure, automates deployment pipelines, and ensures reliable software delivery and operations.',
  'Performance Engineer': 'Optimizes system performance, conducts load testing, and ensures applications meet performance requirements.',
  'Product Owner': 'Defines product vision, manages backlog priorities, and ensures development aligns with business objectives.',
  'Site Reliability Engineer': 'Maintains system reliability, monitors performance, and implements practices for scalable infrastructure.',
  'Solutions Architect': 'Designs technical solutions, defines system architecture, and ensures alignment with business requirements.',
  'System Engineer': 'Designs and maintains complex systems, ensuring integration and optimal performance across infrastructure.',
  'Technical Writers': 'Creates technical documentation, user guides, and ensures clear communication of complex technical concepts.',
  'Test Engineer': 'Designs and executes test strategies, ensures quality assurance, and validates software functionality.',
  'Testers (QA Engineers)': 'Performs quality assurance testing, identifies defects, and ensures software meets specified requirements.',
  'Project Manager': 'Plans, executes, and oversees projects, managing resources, timelines, and stakeholder communication.',
  'Scrum Master': 'Facilitates agile processes, removes impediments, and ensures team follows scrum methodology effectively.',
  'Product Manager': 'Defines product strategy, manages roadmaps, and coordinates between business and technical teams.',
  'Technical Lead': 'Provides technical leadership, guides development teams, and ensures architectural and coding standards.',
  'UX/UI Designer': 'Designs user interfaces and experiences, creating intuitive and visually appealing digital products.'
};

const getCardItems = (selectedPersona, searchTerm = '') => {
  let filteredPatterns;
  if (!selectedPersona) {
    filteredPatterns = patterns;
  } else {
    filteredPatterns = patterns.filter(pattern => pattern.persona === selectedPersona);
  }
  
  if (searchTerm) {
    filteredPatterns = filteredPatterns.filter(pattern => 
      pattern.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filteredPatterns;
};

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [patternSearch, setPatternSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const getFilteredPersonas = () => {
    if (!searchValue) {
      return showMore ? personas : personas.slice(0, 8);
    }
    const filtered = personas.filter(persona => 
      persona.toLowerCase().includes(searchValue.toLowerCase())
    );
    return showMore ? filtered : filtered.slice(0, 8);
  };
  const visiblePersonas = getFilteredPersonas();
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [filterTokens, setFilterTokens] = useState([]);
  const [favoritePersonas, setFavoritePersonas] = useState([]);

  useEffect(() => {
    const navButton = document.querySelector('.awsui_navigation-close_1fj9k_jfqbk_8');
    if (navButton) {
      navButton.addEventListener('click', () => setSelectedPersona(null));
    }
    return () => {
      if (navButton) {
        navButton.removeEventListener('click', () => setSelectedPersona(null));
      }
    };
  }, []);

  const sideNavItems = [
    {
      type: 'section',
      text: 'PERSONAS',
      items: personas.map(persona => ({
        type: 'link',
        text: persona,
        href: '#'
      }))
    },
    {
      type: 'section', 
      text: 'CAPABILITIES',
      items: capabilities.map(capability => ({
        type: 'link',
        text: capability,
        href: '#'
      }))
    }
  ];

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <AppLayout
        navigationOpen={true}
        toolsHide={true}
        navigation={
          <SideNavigation
            header={{
              href: '#',
              text: (
                <span style={{ cursor: 'pointer' }} onClick={() => setSelectedPersona(null)}>Service_name</span>
              )
            }}
            onFollow={({ detail }) => {
              if (personas.includes(detail.text)) {
                setSelectedPersona(detail.text);
              }
            }}
            items={[
              {
                type: 'section',
                text: 'PERSONAS',
                expanded: false,
                items: [
                  {
                    type: 'section-group',
                    title: '',
                    items: [
                      {
                        type: 'link',
                        text: (
                          <Input
                            placeholder="Search Personas"
                            value={searchValue}
                            onChange={({ detail }) => setSearchValue(detail.value)}
                            iconName="search"
                          />
                        )
                      },
                      ...visiblePersonas.map(persona => ({
                        type: 'link',
                        text: (
                          <div 
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 12px',
                              margin: '-8px -12px',
                              backgroundColor: selectedPersona === persona ? '#e6f3ff' : 'transparent',
                              borderLeft: selectedPersona === persona ? '3px solid #0972d3' : 'none',
                              color: selectedPersona === persona ? '#0972d3' : 'inherit',
                              fontWeight: selectedPersona === persona ? 'bold' : 'normal',
                              cursor: 'pointer',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedPersona !== persona) {
                                e.target.style.backgroundColor = '#f5f5f5';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedPersona !== persona) {
                                e.target.style.backgroundColor = 'transparent';
                              }
                            }}
                            onClick={() => setSelectedPersona(persona)}
                          >
                            <span>{persona}</span>
                            {selectedPersona === persona && (
                              <Icon 
                                name={favoritePersonas.includes(persona) ? "star-filled" : "star"}
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (favoritePersonas.includes(persona)) {
                                    setFavoritePersonas(favoritePersonas.filter(p => p !== persona));
                                  } else {
                                    setFavoritePersonas([...favoritePersonas, persona]);
                                  }
                                }}
                              />
                            )}
                          </div>
                        ),
                        href: '#'
                      })),
                      {
                        type: 'link',
                        text: (
                          <span 
                            style={{ cursor: 'pointer', color: '#0972d3' }}
                            onClick={() => setShowMore(!showMore)}
                          >
                            {showMore ? 'Show less' : `Show more (+${searchValue ? getFilteredPersonas().length - Math.min(getFilteredPersonas().length, 8) : personas.length - 8})`}
                          </span>
                        )
                      }
                    ]
                  }
                ]
              },
              { type: 'divider' },
              {
                type: 'section',
                text: 'CAPABILITIES',
                expanded: false,
                items: capabilities.map(capability => ({
                  type: 'link',
                  text: capability,
                  href: '#'
                }))
              },
              { type: 'divider' },
              { type: 'link', text: 'Notifications', href: '#' },
              { 
                type: 'link', 
                text: (
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <span>Documentation</span>
                    <Icon name="external" />
                  </SpaceBetween>
                ), 
                href: '#' 
              },
              { type: 'link', text: 'Nice things', href: '#' }
            ]}
          />
        }
        content={
          <ContentLayout>
            <SpaceBetween size="l">
              {selectedPersona ? (
                // Persona Details Page
                <>
                  <Container
                    header={
                      <Header
                        variant="h1"
                        description={personaDescriptions[selectedPersona] || 'Patterns required for Planning, Requirements Analysis, Design, Development, Testing, Deployment and Maintenance'}
                        actions={
                          <SpaceBetween direction="horizontal" size="xs">
                            <Button iconName="status-positive" variant="icon" ariaLabel="Feedback" />
                            <Button 
                              iconName="external"
                              onClick={() => window.open('https://github.com/aws-samples/sample-ai-powered-sdlc-patterns-with-aws', '_blank')}
                            >
                              Open on GitHub
                            </Button>
                            <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                          </SpaceBetween>
                        }
                      >
                        {selectedPersona}
                      </Header>
                    }
                  >
                    <SpaceBetween size="m">
                      <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                        <SpaceBetween size="s">
                          <Input
                            type="search"
                            placeholder="Find patterns"
                            value={patternSearch}
                            onChange={({ detail }) => setPatternSearch(detail.value)}
                            iconName="search"
                          />
                          <TokenGroup
                            items={filterTokens}
                            onDismiss={({ detail }) => {
                              const dismissedToken = filterTokens[detail.itemIndex];
                              const itemId = parseInt(dismissedToken.value.replace('item', ''));
                              setSelectedItems(selectedItems.filter(id => id !== itemId));
                              setFilterTokens(filterTokens.filter((_, index) => index !== detail.itemIndex));
                            }}
                            onClick={({ detail }) => {
                              window.open('https://github.com/aws-samples/sample-ai-powered-sdlc-patterns-with-aws', '_blank');
                            }}
                          />
                        </SpaceBetween>
                        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                          <Pagination
                            currentPageIndex={currentPage}
                            pagesCount={5}
                            onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                          />
                          <Button iconName="status-info" variant="icon" ariaLabel="Info" />
                        </SpaceBetween>
                      </Grid>
                    </SpaceBetween>
                  </Container>
                  
                  <Cards
                    cardDefinition={{
                      header: item => (
                        <span style={{color: "#0972d3", fontWeight: "bold"}}>{item.heading}</span>
                      ),
                      sections: [
                        {
                          id: "description",
                          header: "Description",
                          content: item => item.description
                        },
                        {
                          id: "persona",
                          header: "Persona",
                          content: item => item.persona
                        }
                      ]
                    }}
                    cardsPerRow={[
                      { cards: 1 },
                      { minWidth: 500, cards: 2 },
                      { minWidth: 992, cards: 4 }
                    ]}
                    items={getCardItems(selectedPersona, patternSearch)}
                    empty="No items found"
                    selectedItems={getCardItems(selectedPersona, patternSearch).filter(item => selectedItems.includes(item.id))}
                    selectionType="multi"
                    onSelectionChange={({ detail }) => {
                      const newSelectedItems = detail.selectedItems.map(item => item.id);
                      setSelectedItems(newSelectedItems);
                      const newTokens = newSelectedItems.map(id => {
                        const pattern = patterns.find(p => p.id === id);
                        return { label: pattern?.heading || `Item ${id}`, value: `item${id}` };
                      });
                      setFilterTokens(newTokens);
                    }}
                  />
                </>
              ) : (
                // Default All Patterns Page
                <>
                  <Container
                    header={
                      <Header
                        variant="h1"
                        description="Description"
                        actions={
                          <SpaceBetween direction="horizontal" size="xs">
                            <Button 
                              iconName="refresh" 
                              variant="icon" 
                              ariaLabel="Refresh" 
                              onClick={() => {
                                setSelectedItems([]);
                                setFilterTokens([]);
                                setPatternSearch('');
                                setRequirements('');
                                setCurrentPage(1);
                              }}
                            />
                            <Button 
                              variant="primary" 
                              iconName="external"
                              onClick={() => window.open('https://github.com/aws-samples/sample-ai-powered-sdlc-patterns-with-aws', '_blank')}
                            >
                              Open on GitHub
                            </Button>
                            <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                          </SpaceBetween>
                        }
                      >
                        All Patterns
                      </Header>
                    }
                  >
                    <SpaceBetween size="m">
                      <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                        <Input
                          type="search"
                          placeholder="Find patterns"
                          value={patternSearch}
                          onChange={({ detail }) => setPatternSearch(detail.value)}
                          iconName="search"
                        />
                        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                          <Pagination
                            currentPageIndex={currentPage}
                            pagesCount={5}
                            onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                          />
                          <Button iconName="status-info" variant="icon" ariaLabel="Info" />
                        </SpaceBetween>
                      </Grid>
                      
                      <Grid gridDefinition={[{ colspan: 9 }, { colspan: 3 }]}>
                        <Textarea
                          placeholder="Type your requirements here"
                          value={requirements}
                          onChange={({ detail }) => setRequirements(detail.value)}
                          rows={4}
                        />
                        <Button variant="primary">Suggested Patterns</Button>
                      </Grid>
                    </SpaceBetween>
                  </Container>
                  
                  <Cards
                    cardDefinition={{
                      header: item => (
                        <span style={{color: "#0972d3", fontWeight: "bold"}}>{item.heading}</span>
                      ),
                      sections: [
                        {
                          id: "description",
                          header: "Description",
                          content: item => item.description
                        },
                        {
                          id: "persona",
                          header: "Persona",
                          content: item => item.persona
                        }
                      ]
                    }}
                    cardsPerRow={[
                      { cards: 1 },
                      { minWidth: 500, cards: 2 },
                      { minWidth: 992, cards: 4 }
                    ]}
                    items={getCardItems(null, patternSearch)}
                    empty="No items found"
                    selectedItems={getCardItems(null, patternSearch).filter(item => selectedItems.includes(item.id))}
                    selectionType="multi"
                    onSelectionChange={({ detail }) => {
                      const newSelectedItems = detail.selectedItems.map(item => item.id);
                      setSelectedItems(newSelectedItems);
                      const newTokens = newSelectedItems.map(id => {
                        const pattern = patterns.find(p => p.id === id);
                        return { label: pattern?.heading || `Item ${id}`, value: `item${id}` };
                      });
                      setFilterTokens(newTokens);
                    }}
                  />
                </>
              )}
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </div>
  );
}

export default App;