"use client";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/lib/validationSchema";
import useFetch from "@/hooks/use-fetch";
import { saveResume } from "@/actions/resume";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      education: [],
      experience: [],
      skills: "",
      summary: "",
      projects: [],
    },
  });

  const {
    loading: isSaving,
    error: saveError,
    data: saveResult,
    fn: saveResumeFn,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if(initialContent) {
        setActiveTab("preview");
    } 
  }, [initialContent]);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center  gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button variant={"destructive"}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="preview">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
