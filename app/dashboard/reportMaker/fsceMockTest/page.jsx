"use client";
import { useState, useEffect, useRef } from 'react';
import { Box, Snackbar, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { mockTestService } from '@/app/services';
import MySnackbar from '@/app/Components/MySnackbar/MySnackbar';

// Import all components from the index file
import {
  PageHeader,
  MockTestSelection,
  BatchInformation,
  MaxScoresSection,
  GradingCriteriaSection,
  PerformanceBoundariesSection,
  StudentScoresTable,
  SaveButton
} from './Comp';

// Utility function to calculate ranks
function calculateRanks(students, paperSections) {
  if (!students || students.length === 0 || !paperSections || paperSections.length === 0) {
    return students;
  }

  // Helper to get total score for a subject
  function getTotalForSubject(student, subject) {
    let total = 0;
    
    paperSections.forEach(paper => {
      paper.sections.forEach(section => {
        if (section.subject === subject) {
          const sectionId = section.sectionId;
          const score = student.scores?.[sectionId] || '';
          if (score !== '') {
            total += Number(score);
          }
        }
      });
    });
    
    return total;
  }
  
  // Helper to get overall total
  function getOverallTotal(student) {
    let total = 0;
    
    paperSections.forEach(paper => {
      paper.sections.forEach(section => {
        const sectionId = section.sectionId;
        const score = student.scores?.[sectionId] || '';
        if (score !== '') {
          total += Number(score);
        }
      });
    });
    
    return total;
  }

  // Helper to rank an array of students by a score function
  function rankByScore(arr, scoreFn) {
    // Sort descending, higher score = better rank
    const sorted = [...arr].sort((a, b) => (scoreFn(b) - scoreFn(a)));
    let lastScore = null, lastRank = 0;
    
    return sorted.map((student, idx) => {
      const score = scoreFn(student);
      if (score !== lastScore) {
        lastRank = idx + 1;
        lastScore = score;
      }
      return { id: student.id, rank: score > 0 ? lastRank : 0 };
    });
  }

  // Create ranking lists
  const mathRanks = rankByScore(students, student => getTotalForSubject(student, 'math'));
  const englishRanks = rankByScore(students, student => getTotalForSubject(student, 'english'));
  const overallRanks = rankByScore(students, student => getOverallTotal(student));

  // Helper to get rank by id
  const getRank = (arr, id) => arr.find(r => r.id === id)?.rank || 0;

  // Add ranks to each student
  return students.map(s => ({
    ...s,
    mathRank: getRank(mathRanks, s.id),
    englishRank: getRank(englishRanks, s.id),
    overallRank: getRank(overallRanks, s.id),
  }));
}

// Function to generate default paper sections
const getDefaultPaperSections = () => {
  const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return [
    {
      paperId: generateId(),
      paperName: 'Paper 1',
      sections: [
        { sectionId: generateId(), sectionName: 'Comprehension', subject: 'english', maxScore: 10 },
        { sectionId: generateId(), sectionName: 'Math', subject: 'math', maxScore: 20 },
        { sectionId: generateId(), sectionName: 'Antonym', subject: 'english', maxScore: 10 },
        { sectionId: generateId(), sectionName: 'Spelling', subject: 'english', maxScore: 10 },
        { sectionId: generateId(), sectionName: 'Missing Letters', subject: 'english', maxScore: 10 },
      ],
    },
    {
      paperId: generateId(),
      paperName: 'Paper 2',
      sections: [
        { sectionId: generateId(), sectionName: 'Math', subject: 'math', maxScore: 20 },
        { sectionId: generateId(), sectionName: 'Synonym', subject: 'english', maxScore: 10 },
        { sectionId: generateId(), sectionName: 'Antonym', subject: 'english', maxScore: 10 },
        { sectionId: generateId(), sectionName: 'Word Definition', subject: 'english', maxScore: 10 },
      ],
    },
    {
      paperId: generateId(),
      paperName: 'Paper 3',
      sections: [
        { sectionId: generateId(), sectionName: 'CW', subject: 'creativeWriting', maxScore: 10 },
      ],
    },
  ];
};

// Function to generate default grading criteria
const getDefaultGradingCriteria = () => {
  return {
    ICQ: {
      math: {
        safe: 24,
        border: 23,
      },
      english: {
        safe: 55,
        border: 57.8,
      },
      creativeWriting: {
        safe: 12,
        border: 10,
      }
    },
    OQ: {
      math: {
        safe: 33,
        border: 41.7,
      },
      english: {
        safe: 70,
        border: 78.8,
      },
      creativeWriting: {
        safe: 12,
        border: 10,
      }
    }
  };
};

// Function to generate default performance boundaries
const getDefaultPerformanceBoundaries = () => {
  return {
    math: {
      excellent: 45,
      good: 35,
      average: 25,
    },
    english: {
      excellent: 40,
      good: 30,
      average: 20,
    },
    creativeWriting: {
      excellent: 15,
      good: 12,
      average: 10,
    }
  };
};

const FSCEMockTestMaker = () => {
  const snackRef = useRef();
  
  // State management
  const [mockTests, setMockTests] = useState([]);
  const [selectedMockTest, setSelectedMockTest] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [mockTestExists, setMockTestExists] = useState(false);
  const [students, setStudents] = useState([]);
  const [paperSections, setPaperSections] = useState([]);
  const [gradingCriteria, setGradingCriteria] = useState(getDefaultGradingCriteria());
  const [performanceBoundaries, setPerformanceBoundaries] = useState(getDefaultPerformanceBoundaries());
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  // State for available batches
  const [availableBatches, setAvailableBatches] = useState([]);
  // State to show form without calling API
  const [showCreateForm, setShowCreateForm] = useState(false);
  // flag to indicate if ranks calculated to show maybe
  const [ranksCalculated, setRanksCalculated] = useState(false);

  // Fetch the list of available mock tests
  useEffect(() => {
    fetchPastMockTest()
  }, [])

  async function fetchPastMockTest() {
    setLoading(true)
    try {
      const response = await mockTestService.getPastFsceMockTest();
      
      if(response.variant === "success"){
        setLoading(false)
        // Process mock tests and filter past batches
        const processedTests = response.data.map(test => {
          const currentDate = new Date();
          // Filter past batches (dates that have already occurred)
          const pastBatches = test.batch.filter(batch => {
            const batchDate = new Date(batch.date);
            return batchDate < currentDate;
          });
          
          
          return {
            ...test,
            pastBatches
          };
        });
        
        setMockTests(processedTests);
      } else {
        setLoading(false);
        setSnackbar({
          open: true,
          message: response.message || 'Failed to fetch mock tests',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching mock tests:', error);
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Failed to fetch mock tests',
        severity: 'error'
      });
    }
  }
  
  // Handle mock test selection
  const handleMockTestChange = async (event) => {
    const mockTestId = event.target.value;
    setSelectedMockTest(mockTestId);
    setSelectedBatch(''); // Reset batch selection
    setShowCreateForm(false); // Reset form state
    
    if (mockTestId) {
      // Find the selected test and get its batches
      const selectedTest = mockTests.find(test => test._id === mockTestId);
      if (selectedTest && selectedTest.pastBatches) {
        setAvailableBatches(selectedTest.pastBatches);
      } else {
        setAvailableBatches([]);
      }
    } else {
      setMockTestExists(false);
      setStudents([]);
      setAvailableBatches([]);
    }
  };

  // Handle batch selection
  const handleBatchChange = async (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);
    setShowCreateForm(false); // Reset form state when changing batches
    
    if (batchId) {
      try {
        setActionLoading(true);
        // Check if the mock test report exists for this batch
        const response = await mockTestService.getFsceMockReport({
          mockTestId: selectedMockTest,
          batchId
        });
        
        setMockTestExists(response.variant === "success");
        if(response.variant === "success"){
          // Process paper sections from API response
          if (response.data.paperSections && response.data.paperSections.length > 0) {
            // API returned paper sections
            setPaperSections(response.data.paperSections);
          } else {
            // Legacy format - convert old format to new paper sections
            const defaultPaper = {
              paperId: "paper_1",
              paperName: "Paper 1",
              sections: [
                {
                  sectionId: "section_math",
                  sectionName: "Math",
                  subject: "math",
                  maxScore: response.data.mathsMaxScore || 80
                },
                {
                  sectionId: "section_english",
                  sectionName: "English",
                  subject: "english",
                  maxScore: response.data.englishMaxScore || 70
                }
              ]
            };
            setPaperSections([defaultPaper]);
          }

          // Process grading criteria from API response
          if (response.data.gradingCriteria) {
            setGradingCriteria(response.data.gradingCriteria);
          } else {
            // Use default grading criteria if not available
            setGradingCriteria(getDefaultGradingCriteria());
          }

          // Process performance boundaries from API response
          if (response.data.performanceBoundaries) {
            setPerformanceBoundaries(response.data.performanceBoundaries);
          } else {
            // Use default performance boundaries if not available
            setPerformanceBoundaries(getDefaultPerformanceBoundaries());
          }

          // Set publish status
          if (response.data.hasOwnProperty('isPublished')) {
            setIsPublished(response.data.isPublished);
          } else {
            setIsPublished(false);
          }

          // Fetch students for this mock test and batch
          const studentsResponse = await mockTestService.getAllChildOfMockTest({
            mockTestId: selectedMockTest,
            batchId
          });

          if (studentsResponse.variant === "success" && studentsResponse.data) {
            // Map students with their scores from the report
            const processedStudents = processStudentScores(studentsResponse.data, response.data);
            setStudents(processedStudents);
            setRanksCalculated(true);
          } else {
            setStudents([]);
            snackRef.current.handleSnack({
              severity: "info",
              message: studentsResponse.message || 'No students found for this mock test'
            });
          }
        } else {
          // Initialize empty paper structure for new report
          setPaperSections(getDefaultPaperSections());
          
          await fetchStudents(selectedMockTest, batchId);
        }
      } catch (error) {
        console.error('Error checking mock test:', error);
        setMockTestExists(false);
        snackRef.current.handleSnack({
          severity: "error",
          message: 'Failed to load mock test data'
        });
      } finally {
        setActionLoading(false);
      }
    } else {
      setMockTestExists(false);
      setStudents([]);
    }
  };

  // Process student scores from API response
  const processStudentScores = (studentsData, reportData) => {
    // Check if we have the new format or need to convert from old format
    const hasNewFormat = reportData.paperSections && reportData.paperSections.length > 0;
    const currentPaperSections = hasNewFormat ? reportData.paperSections : [{
      paperId: "paper_1",
      paperName: "Paper 1",
      sections: [
        {
          sectionId: "section_math",
          sectionName: "Math",
          subject: "math",
          maxScore: reportData.mathsMaxScore || 80
        },
        {
          sectionId: "section_english",
          sectionName: "English",
          subject: "english",
          maxScore: reportData.englishMaxScore || 70
        }
      ]
    }];
    
    // Map students with their scores
    const studentsWithScores = studentsData.map(student => {
      // Find score data for this student
      const scoreData = reportData.childScore.find(s => s.childId === student.childId);
      
      // Initialize scores object
      let scores = {};
      
      if (hasNewFormat && scoreData && scoreData.sectionScores) {
        // Use section scores from new format
        scores = { ...scoreData.sectionScores };
      } else if (scoreData) {
        // Convert old format scores to new format
        scores = {
          "section_math": scoreData.mathsScore !== undefined ? String(scoreData.mathsScore) : '',
          "section_english": scoreData.englishScore !== undefined ? String(scoreData.englishScore) : ''
        };
      }
      
      return {
        id: student.childId,
        name: student.childDetails.name,
        year: student.childDetails.year,
        parentName: `${student.parentDetails.firstName} ${student.parentDetails.lastName}`,
        parentEmail: student.parentDetails.email,
        parentMobile: student.parentDetails.mobile,
        scores: scores,
        // Ranks will be calculated separately
      };
    });
    
    // Calculate ranks
    return calculateRanks(studentsWithScores, currentPaperSections);
  };

  // Fetch students for a mock test
  const fetchStudents = async (mockTestId, batchId) => {
    try {
      setActionLoading(true);
      
      // Use the service to fetch students for the mock test
      const response = await mockTestService.getAllChildOfMockTest({
        mockTestId,
        batchId
      });
      
      if (response.variant === "success" && response.data && response.data.length > 0) {
        // Initialize students with empty scores
        const studentsWithEmptyScores = response.data.map(student => ({
          id: student.childId,
          name: student.childDetails.name,
          year: student.childDetails.year,
          parentName: `${student.parentDetails.firstName} ${student.parentDetails.lastName}`,
          parentEmail: student.parentDetails.email,
          parentMobile: student.parentDetails.mobile,
          scores: {}
        }));
        
        setStudents(studentsWithEmptyScores);
      } else {
        // Handle case when no students are found
        setStudents([]);
        
        snackRef.current.handleSnack({
          severity: "info",
          message: response.message || 'No students found for this mock test'
        });
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      snackRef.current.handleSnack({
        severity: "error",
        message: 'Failed to fetch student data'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle score change for a student
  const handleScoreChange = (studentId, sectionId, value) => {
    // Find the section to get max score
    let maxScore = 0;
    let foundSection = null;
    
    for (const paper of paperSections) {
      const section = paper.sections.find(s => s.sectionId === sectionId);
      if (section) {
        foundSection = section;
        maxScore = section.maxScore;
        break;
      }
    }
    
    if (!foundSection) return;
    
    const numericValue = value === '' ? '' : Number(value);
    
    // Don't allow scores greater than max
    if (numericValue !== '' && numericValue > maxScore) {
      return;
    }
    
    setStudents(prev => {
      const updated = prev.map(student => {
        if (student.id === studentId) {
          // Create or update the scores object
          const updatedScores = {...(student.scores || {})};
          updatedScores[sectionId] = numericValue === '' ? '' : String(numericValue);
          
          return { 
            ...student, 
            scores: updatedScores
          };
        }
        return student;
      });
      
      setRanksCalculated(false);
      return updated;
    });
  };

  // manually calculate ranks
  const handleCalculateRanks = () => {
    setStudents(prev => calculateRanks(prev, paperSections));
    setRanksCalculated(true);
  };

  // Handle updating paper sections structure
  const handleUpdatePaperSections = (updatedSections) => {
    setPaperSections(updatedSections);
  };

  // Handle updating grading criteria
  const handleUpdateGradingCriteria = (updatedCriteria) => {
    setGradingCriteria(updatedCriteria);
  };

  // Handle updating performance boundaries
  const handleUpdatePerformanceBoundaries = (updatedBoundaries) => {
    setPerformanceBoundaries(updatedBoundaries);
  };

  // Handle publish status toggle
  const handleIsPublishedChange = (value) => {
    setIsPublished(value);
  };

  // Create a new mock test with the selected ID - now just shows the form
  const handleCreateNew = () => {
    setShowCreateForm(true);
    
    // Initialize with default paper structure, grading criteria and performance boundaries
    setPaperSections(getDefaultPaperSections());
    setGradingCriteria(getDefaultGradingCriteria());
    setPerformanceBoundaries(getDefaultPerformanceBoundaries());
    
    // Fetch students for this mock test without creating a report
    fetchStudents(selectedMockTest, selectedBatch);
  };

  // New function to actually save the created test when user clicks save
  const handleSaveChanges = async () => {
    try {
      setActionLoading(true);
      
      // Validate that we have at least one section
      let hasSections = false;
      for (const paper of paperSections) {
        if (paper.sections.length > 0) {
          hasSections = true;
          break;
        }
      }
      
      if (!hasSections) {
        snackRef.current.handleSnack({
          severity: "error",
          message: 'Please add at least one section before saving'
        });
        setActionLoading(false);
        return;
      }
      
      // Ensure ranks are calculated
      const studentsWithRanks = ranksCalculated ? students : calculateRanks(students, paperSections);
      // Prepare student scores with section format
      const sectionScoresData = studentsWithRanks.map(student => ({
        childId: student.id,
        sectionScores: student.scores || {},
        // Include ranks
        mathRank: student.mathRank || 0,
        englishRank: student.englishRank || 0,
        overallRank: student.overallRank || 0
      }));
      
      // Create report with new paper sections format
      const mockTestData = {
        mockTestId: selectedMockTest,
        batchId: selectedBatch,
        paperSections: paperSections,
        gradingCriteria: gradingCriteria,
        performanceBoundaries: performanceBoundaries,
        childScore: sectionScoresData,
        isPublished
      };
      
      // Make the API call using the service
      const response = await mockTestService.addFsceMockReport(mockTestData);
      
      if (response.variant === "success") {
        // Show success message using the snackbar ref
        snackRef.current.handleSnack({
          severity: "success",
          message: response.message || 'New mock test report created successfully'
        });
        
        setMockTestExists(true);
        setShowCreateForm(false); // Hide form after successful save
      } else {
        // Show error message
        snackRef.current.handleSnack({
          severity: "error",
          message: response.message || 'Failed to create new mock test report'
        });
      }
    } catch (error) {
      console.error('Error saving mock test:', error);
      // Show error message
      snackRef.current.handleSnack({
        severity: "error",
        message: 'Failed to create new mock test report'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Update the save function to use the new paper structure format
  const handleSave = async () => {
    try {
      setActionLoading(true);
      
      // Validate that we have at least one section
      let hasSections = false;
      for (const paper of paperSections) {
        if (paper.sections.length > 0) {
          hasSections = true;
          break;
        }
      }
      
      if (!hasSections) {
        snackRef.current.handleSnack({
          severity: "error",
          message: 'Please add at least one section before saving'
        });
        setActionLoading(false);
        return;
      }
      
      // Ensure ranks are calculated
      const studentsWithRanks = ranksCalculated ? students : calculateRanks(students, paperSections);
      // Prepare student scores with section format
      const sectionScoresData = studentsWithRanks.map(student => ({
        childId: student.id,
        sectionScores: student.scores || {},
        // Include ranks
        mathRank: student.mathRank || 0,
        englishRank: student.englishRank || 0,
        overallRank: student.overallRank || 0
      }));
      
      // Create mock test data with paper sections
      const mockTestData = {
        mockTestId: selectedMockTest,
        batchId: selectedBatch,
        paperSections: paperSections,
        gradingCriteria: gradingCriteria,
        performanceBoundaries: performanceBoundaries,
        childScore: sectionScoresData,
        isPublished
      };
      
      // Make the API call using the service
      const response = await mockTestService.addFsceMockReport(mockTestData);
      
      if (response.variant === "success") {
        // Show success message using the snackbar ref
        snackRef.current.handleSnack({
          severity: "success",
          message: response.message || 'Mock test scores saved successfully'
        });
        
        setMockTestExists(true);
      } else {
        // Show error message
        snackRef.current.handleSnack({
          severity: "error",
          message: response.message || 'Failed to save mock test scores'
        });
      }
    } catch (error) {
      console.error('Error saving mock test scores:', error);
      // Show error message
      snackRef.current.handleSnack({
        severity: "error",
        message: 'Failed to save mock test scores'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Function to reload student data
  const handleReloadStudents = () => {
    if (selectedMockTest && selectedBatch) {
      fetchStudents(selectedMockTest, selectedBatch);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{
      p: { xs: 1, sm: 2 },
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)',
    }}>
      {/* Page Header */}
      <PageHeader actionLoading={actionLoading} />
      
      {/* Mock Test Selection Accordion */}
      <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '8px 8px 0 0',
            '&.Mui-expanded': {
              minHeight: 48,
            },
            '& .MuiAccordionSummary-content': {
              margin: '12px 0',
            }
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            📋 Mock Test & Batch Selection
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <MockTestSelection
            mockTests={mockTests}
            selectedMockTest={selectedMockTest}
            selectedBatch={selectedBatch}
            availableBatches={availableBatches}
            mockTestExists={mockTestExists}
            loading={loading}
            actionLoading={actionLoading}
            showCreateForm={showCreateForm}
            handleMockTestChange={handleMockTestChange}
            handleBatchChange={handleBatchChange}
            handleCreateNew={handleCreateNew}
          />
        </AccordionDetails>
      </Accordion>

      {/* Batch Information Accordion */}
      {selectedMockTest && selectedBatch && availableBatches.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'info.main',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              '&.Mui-expanded': {
                minHeight: 48,
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0',
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              ℹ️ Batch Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <BatchInformation
              selectedBatch={selectedBatch}
              availableBatches={availableBatches}
              students={students}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Paper Sections Accordion */}
      {selectedMockTest && selectedBatch && (mockTestExists || showCreateForm) && (
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'warning.main',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              '&.Mui-expanded': {
                minHeight: 48,
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0',
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              📝 Exam Structure & Maximum Scores
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <MaxScoresSection
              paperSections={paperSections}
              handleUpdatePaperSections={handleUpdatePaperSections}
              actionLoading={actionLoading}
              isPublished={isPublished}
              handleIsPublishedChange={handleIsPublishedChange}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Grading Criteria Accordion */}
      {selectedMockTest && selectedBatch && (mockTestExists || showCreateForm) && (
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'success.main',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              '&.Mui-expanded': {
                minHeight: 48,
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0',
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              🎯 Grading Criteria
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <GradingCriteriaSection
              gradingCriteria={gradingCriteria}
              handleUpdateGradingCriteria={handleUpdateGradingCriteria}
              actionLoading={actionLoading}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Performance Boundaries Accordion */}
      {selectedMockTest && selectedBatch && (mockTestExists || showCreateForm) && (
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'secondary.main',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              '&.Mui-expanded': {
                minHeight: 48,
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0',
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              📊 Performance Boundaries
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <PerformanceBoundariesSection
              performanceBoundaries={performanceBoundaries}
              handleUpdatePerformanceBoundaries={handleUpdatePerformanceBoundaries}
              actionLoading={actionLoading}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Student Scores Accordion */}
      {selectedMockTest && selectedBatch && (mockTestExists || showCreateForm) && (
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              '&.Mui-expanded': {
                minHeight: 48,
              },
              '& .MuiAccordionSummary-content': {
                margin: '12px 0',
              }
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              🎓 Student Scores
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <StudentScoresTable
              students={students}
              paperSections={paperSections}
              actionLoading={actionLoading}
              handleScoreChange={handleScoreChange}
              onReloadStudents={handleReloadStudents}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Save Button */}
      {selectedMockTest && selectedBatch && (
        <SaveButton
          mockTestExists={mockTestExists}
          showCreateForm={showCreateForm}
          actionLoading={actionLoading}
          handleSave={handleSave}
          handleSaveChanges={handleSaveChanges}
          onCalculateRanks={handleCalculateRanks}
        />
      )}

      {/* Snackbar for feedback */}
      <MySnackbar ref={snackRef} />
    </Box>
  );
};

export default FSCEMockTestMaker;
