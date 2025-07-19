"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      }else{
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-title">
            Your AI Career Coach For
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            "AI-powered career toolkit for resumes, cover letters, insights, and
            quizzes."
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8 cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button size="lg" variant="outline" className="px-8 cursor-pointer">
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/prepai-banner.png"}
              width={1280}
              height={720}
              alt="Banner Image"
              priority
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
