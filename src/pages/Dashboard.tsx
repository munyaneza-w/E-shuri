import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, BookOpen, FileText, TrendingUp, LogOut, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  full_name: string;
  role: "student" | "teacher";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .single();

    if (error) {
      toast.error("Failed to load profile");
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent to-background">
        <nav className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-48" />
          </div>
        </nav>
        <div className="container mx-auto p-6">
          <Skeleton className="h-32 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <nav className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">E-shuri</h1>
              <p className="text-xs text-muted-foreground">Rwanda Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/subjects")}>
              Browse Subjects
            </Button>
            {profile?.role === "teacher" && (
              <Button variant="ghost" onClick={() => navigate("/upload")}>
                Upload Content
              </Button>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.full_name}!
          </h2>
          <p className="text-muted-foreground text-lg">
            {profile?.role === "student"
              ? "Continue your learning journey"
              : "Manage your content and track student progress"}
          </p>
        </div>

        {profile?.role === "student" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/subjects")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-2">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle>Browse Subjects</CardTitle>
                <CardDescription>
                  Explore curriculum-aligned content across all subjects
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/quizzes")}>
              <CardHeader>
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg w-fit mb-2">
                  <FileText className="h-8 w-8" />
                </div>
                <CardTitle>Take Quizzes</CardTitle>
                <CardDescription>
                  Test your knowledge with practice exams
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/progress")}>
              <CardHeader>
                <div className="bg-accent-foreground/10 text-accent-foreground p-3 rounded-lg w-fit mb-2">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <CardTitle>My Progress</CardTitle>
                <CardDescription>
                  Track your performance and quiz history
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/upload")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-2">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle>Upload Content</CardTitle>
                <CardDescription>
                  Add new lessons, videos, and materials
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/create-quiz")}>
              <CardHeader>
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg w-fit mb-2">
                  <FileText className="h-8 w-8" />
                </div>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  Build assessments for your students
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/student-performance")}>
              <CardHeader>
                <div className="bg-accent-foreground/10 text-accent-foreground p-3 rounded-lg w-fit mb-2">
                  <Award className="h-8 w-8" />
                </div>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  View analytics and track student progress
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
