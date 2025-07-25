"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useFetch from "@/hooks/use-fetch";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correctAns = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correctAns++;
      }
    });
    return (correctAns / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    try {
      const score = calculateScore();
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz submitted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to submit quiz");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setResultData(null);
    generateQuizFn();
    setAnswers([]);
    setShowExplanation(false);
  };

  if (generatingQuiz) {
    return <RingLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if(resultData){
    return (
        <div>
            <QuizResult result={resultData} onStartNew={startNewQuiz} />
        </div>
    )
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your Knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>

        <RadioGroup
          className="space-y-2"
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
        >
          {question.options.map((option, index) => {
            return (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option} id={"option-" + index} />
                <Label htmlFor={"option-" + index}>{option}</Label>
              </div>
            );
          })}
        </RadioGroup>
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted roundd-lg">
            <p className="font-bold">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant={"outline"}
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNextQuestion}
          className="ml-auto"
          disabled={!answers[currentQuestion] || savingResult}
        >
          {savingResult && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
