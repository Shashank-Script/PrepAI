import { getAssessment } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/StatsCards';
import PerformanceChart from './_components/PerformanceChart';
import QuizList from './_components/QuizList';

const InterviewPage = async () => {
  const assessments = await getAssessment();

  return (
    <div>
      <h1 className='text-6xl font-bold gradient-title mb-5'>
        Interview Preparation
      </h1>

      <div className='space-y-6'>
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  )
}

export default InterviewPage