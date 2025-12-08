import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Upload, Activity, CheckCircle2, AlertCircle, Loader2, FileUp, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";

export default function UploadData() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jds");
  
  const [jdFile, setJdFile] = useState(null);
  const [parsedJD, setParsedJD] = useState(null);
  
  const [cvFile, setCvFile] = useState(null);
  const [parsedCV, setParsedCV] = useState(null);
  
  const [activityFile, setActivityFile] = useState(null);
  const [parsedActivities, setParsedActivities] = useState([]);

  const [employeeData, setEmployeeData] = useState([
    { id: 1, name: "", email: "", department: "", position: "", salary: "", productivity: "", utilization: "", fitmentScore: "" },
    { id: 2, name: "", email: "", department: "", position: "", salary: "", productivity: "", utilization: "", fitmentScore: "" },
    { id: 3, name: "", email: "", department: "", position: "", salary: "", productivity: "", utilization: "", fitmentScore: "" },
    { id: 4, name: "", email: "", department: "", position: "", salary: "", productivity: "", utilization: "", fitmentScore: "" },
  ]);
  const [uploadedEmployees, setUploadedEmployees] = useState([]);
  const [employeeFile, setEmployeeFile] = useState(null);
  const [uploadedEmployeeAnalysis, setUploadedEmployeeAnalysis] = useState(null);

  const { data: stats = [] } = useQuery({
    queryKey: ["/api/uploads"],
  });

  const jdUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiRequest("/api/uploads/jd", {
        method: "POST",
        body: formData,
      });

      return response.json();
    },
    onSuccess: (data) => {
      setParsedJD({
        title: data.jobDescription?.title || "Untitled Position",
        description: data.jobDescription?.description || "",
        skills: extractSkills(data.jobDescription?.description || ""),
        department: data.jobDescription?.department || "General",
        requirements: data.jobDescription?.requirements || {},
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/job-descriptions"] });
      
      toast({
        title: "JD Uploaded Successfully",
        description: "Job description has been parsed and saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload job description",
        variant: "destructive",
      });
    },
  });

  const cvUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiRequest("/api/uploads/cv", {
        method: "POST",
        body: formData,
      });

      return response.json();
    },
    onSuccess: (data) => {
      setParsedCV({
        candidateName: data.cv?.candidateName || "Unknown Candidate",
        email: data.cv?.email || "",
        skills: data.cv?.skills || [],
        experience: data.cv?.experience || "",
        education: data.cv?.education || "",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cvs"] });
      
      toast({
        title: "CV Uploaded Successfully",
        description: "Resume has been parsed and saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload CV",
        variant: "destructive",
      });
    },
  });

  const activityUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiRequest("/api/uploads/activity", {
        method: "POST",
        body: formData,
      });

      return response.json();
    },
    onSuccess: (data) => {
      setParsedActivities(data.activities?.slice(0, 10) || []);
      
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      
      toast({
        title: "Activity Data Uploaded",
        description: `${data.count || 0} activity records processed successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload activity data",
        variant: "destructive",
      });
    },
  });

  const employeeUploadMutation = useMutation({
    mutationFn: async (employees) => {
      const response = await apiRequest("/api/employees/bulk", {
        method: "POST",
        body: JSON.stringify({
          employees: employees.filter(emp => emp.name && emp.email)
        }),
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    onSuccess: (data) => {
      setUploadedEmployees(data.employees || []);
      
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      
      toast({
        title: "Employee Data Uploaded",
        description: `${data.count || 0} employees saved successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload employee data",
        variant: "destructive",
      });
    },
  });

  const extractSkills = (text) => {
    const skillKeywords = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Kubernetes"];
    return skillKeywords.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()));
  };

  const handleJDUpload = () => {
    if (jdFile) {
      jdUploadMutation.mutate(jdFile);
    }
  };

  const handleCVUpload = () => {
    if (cvFile) {
      cvUploadMutation.mutate(cvFile);
    }
  };

  const handleActivityUpload = () => {
    if (activityFile) {
      activityUploadMutation.mutate(activityFile);
    }
  };

  const handleEmployeeDataChange = (index, field, value) => {
    const newData = [...employeeData];
    newData[index][field] = value;
    setEmployeeData(newData);
  };

  const handleEmployeeUpload = () => {
    const validEmployees = employeeData.filter(emp => emp.name && emp.email);
    if (validEmployees.length > 0) {
      employeeUploadMutation.mutate(validEmployees);
    } else {
      toast({
        title: "No Valid Data",
        description: "Please fill in at least Name and Email for employees",
        variant: "destructive",
      });
    }
  };

  const handleEmployeeFileUpload = () => {
    if (employeeFile) {
      employeeFileUploadMutation.mutate(employeeFile);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Upload Data</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload and process job descriptions, CVs, and activity data with intelligent parsing
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4" data-testid="tabs-upload">
          <TabsTrigger value="employees" data-testid="tab-employees">
            <Users className="h-4 w-4 mr-2" />
            Employee Data
          </TabsTrigger>
          <TabsTrigger value="jds" data-testid="tab-jds">
            <FileText className="h-4 w-4 mr-2" />
            Job Descriptions
          </TabsTrigger>
          <TabsTrigger value="cvs" data-testid="tab-cvs">
            <FileUp className="h-4 w-4 mr-2" />
            CVs / Resumes
          </TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">
            <Activity className="h-4 w-4 mr-2" />
            Activity Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Employee Data</CardTitle>
              <CardDescription>
                Enter details for up to 4 employees. This data will be used across all pages for analysis and calculations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {employeeData.map((employee, index) => (
                  <Card key={employee.id} className="p-4 bg-muted/50">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold">Employee {index + 1}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-1">
                          <Label htmlFor={`name-${index}`} className="text-xs">Name *</Label>
                          <Input
                            id={`name-${index}`}
                            placeholder="Full Name"
                            value={employee.name}
                            onChange={(e) => handleEmployeeDataChange(index, "name", e.target.value)}
                            data-testid={`input-employee-name-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`email-${index}`} className="text-xs">Email *</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            placeholder="email@company.com"
                            value={employee.email}
                            onChange={(e) => handleEmployeeDataChange(index, "email", e.target.value)}
                            data-testid={`input-employee-email-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`department-${index}`} className="text-xs">Department</Label>
                          <Input
                            id={`department-${index}`}
                            placeholder="e.g. IT, Finance"
                            value={employee.department}
                            onChange={(e) => handleEmployeeDataChange(index, "department", e.target.value)}
                            data-testid={`input-employee-department-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`position-${index}`} className="text-xs">Position</Label>
                          <Input
                            id={`position-${index}`}
                            placeholder="e.g. Senior Analyst"
                            value={employee.position}
                            onChange={(e) => handleEmployeeDataChange(index, "position", e.target.value)}
                            data-testid={`input-employee-position-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`salary-${index}`} className="text-xs">Salary</Label>
                          <Input
                            id={`salary-${index}`}
                            type="number"
                            placeholder="0"
                            value={employee.salary}
                            onChange={(e) => handleEmployeeDataChange(index, "salary", e.target.value)}
                            data-testid={`input-employee-salary-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`productivity-${index}`} className="text-xs">Productivity (%)</Label>
                          <Input
                            id={`productivity-${index}`}
                            type="number"
                            placeholder="0-100"
                            min="0"
                            max="100"
                            value={employee.productivity}
                            onChange={(e) => handleEmployeeDataChange(index, "productivity", e.target.value)}
                            data-testid={`input-employee-productivity-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`utilization-${index}`} className="text-xs">Utilization (%)</Label>
                          <Input
                            id={`utilization-${index}`}
                            type="number"
                            placeholder="0-100"
                            min="0"
                            max="100"
                            value={employee.utilization}
                            onChange={(e) => handleEmployeeDataChange(index, "utilization", e.target.value)}
                            data-testid={`input-employee-utilization-${index}`}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`fitment-${index}`} className="text-xs">Fitment Score</Label>
                          <Input
                            id={`fitment-${index}`}
                            type="number"
                            placeholder="0-10"
                            min="0"
                            max="10"
                            step="0.1"
                            value={employee.fitmentScore}
                            onChange={(e) => handleEmployeeDataChange(index, "fitmentScore", e.target.value)}
                            data-testid={`input-employee-fitment-${index}`}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleEmployeeUpload}
                disabled={employeeUploadMutation.isPending}
                className="w-full"
                size="lg"
                data-testid="button-upload-employees"
              >
                {employeeUploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Employee Data...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Save Employee Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {uploadedEmployees.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                  <CardTitle>Uploaded Employees</CardTitle>
                </div>
                <CardDescription>Successfully saved employee data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Productivity</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Fitment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadedEmployees.map((emp, idx) => (
                        <TableRow key={idx} data-testid={`uploaded-employee-row-${idx}`}>
                          <TableCell className="font-medium">{emp.name}</TableCell>
                          <TableCell>{emp.email}</TableCell>
                          <TableCell>{emp.department || "-"}</TableCell>
                          <TableCell>{emp.position || "-"}</TableCell>
                          <TableCell>{emp.productivity ? `${emp.productivity}%` : "-"}</TableCell>
                          <TableCell>{emp.utilization ? `${emp.utilization}%` : "-"}</TableCell>
                          <TableCell>{emp.fitmentScore ? emp.fitmentScore.toFixed(1) : "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md mt-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-400">
                    Employee data saved successfully and will appear across all pages
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="jds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Job Description</CardTitle>
              <CardDescription>
                Upload a job description document. The system will parse skills, requirements, and department information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="jd-file">Select File</Label>
                <Input
                  id="jd-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setJdFile(file);
                      setParsedJD(null);
                    }
                  }}
                  data-testid="input-jd-file"
                />
                {jdFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {jdFile.name} ({(jdFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleJDUpload}
                disabled={!jdFile || jdUploadMutation.isPending}
                data-testid="button-upload-jd"
              >
                {jdUploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading & Parsing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Parse
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {parsedJD && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                  <CardTitle>Parsed Job Description</CardTitle>
                </div>
                <CardDescription>Review the extracted information below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Job Title</Label>
                  <div className="text-sm font-medium p-3 bg-muted rounded-md">{parsedJD.title}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <div className="text-sm font-medium p-3 bg-muted rounded-md">{parsedJD.department}</div>
                </div>

                <div className="grid gap-2">
                  <Label>Extracted Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {parsedJD.skills.length > 0 ? (
                      parsedJD.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" data-testid={`badge-skill-${idx}`}>
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills detected</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Description Preview</Label>
                  <div className="text-sm p-3 bg-muted rounded-md max-h-40 overflow-y-auto">
                    {parsedJD.description.substring(0, 500)}
                    {parsedJD.description.length > 500 && "..."}
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-400">
                    Job description saved successfully
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cvs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload CV / Resume</CardTitle>
              <CardDescription>
                Upload a candidate resume. The system will extract name, skills, experience, and education.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cv-file">Select File</Label>
                <Input
                  id="cv-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCvFile(file);
                      setParsedCV(null);
                    }
                  }}
                  data-testid="input-cv-file"
                />
                {cvFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleCVUpload}
                disabled={!cvFile || cvUploadMutation.isPending}
                data-testid="button-upload-cv"
              >
                {cvUploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading & Parsing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Parse
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {parsedCV && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                  <CardTitle>Parsed CV Data</CardTitle>
                </div>
                <CardDescription>Review the extracted candidate information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Candidate Name</Label>
                  <div className="text-sm font-medium p-3 bg-muted rounded-md">{parsedCV.candidateName}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <div className="text-sm font-medium p-3 bg-muted rounded-md">{parsedCV.email || "Not provided"}</div>
                </div>

                <div className="grid gap-2">
                  <Label>Extracted Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {parsedCV.skills.length > 0 ? (
                      parsedCV.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" data-testid={`badge-cv-skill-${idx}`}>
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills detected</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Experience</Label>
                  <div className="text-sm p-3 bg-muted rounded-md">{parsedCV.experience || "Not specified"}</div>
                </div>

                <div className="grid gap-2">
                  <Label>Education</Label>
                  <div className="text-sm p-3 bg-muted rounded-md">{parsedCV.education || "Not specified"}</div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-400">
                    CV saved successfully
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Activity Data</CardTitle>
              <CardDescription>
                Upload a CSV file containing employee activity data. Required columns: user, activityType, date, durationMinutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="activity-file">Select CSV File</Label>
                <Input
                  id="activity-file"
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setActivityFile(file);
                      setParsedActivities([]);
                    }
                  }}
                  data-testid="input-activity-file"
                />
                {activityFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {activityFile.name} ({(activityFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Expected CSV Format:</p>
                <code className="text-xs">
                  user,activityType,date,durationMinutes,tower,category
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Example: john@company.com,meeting,2025-01-15,60,Engineering,Development
                </p>
              </div>
              
              <Button
                onClick={handleActivityUpload}
                disabled={!activityFile || activityUploadMutation.isPending}
                data-testid="button-upload-activity"
              >
                {activityUploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing CSV...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Process
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {parsedActivities.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                  <CardTitle>Parsed Activity Data (First 10 rows)</CardTitle>
                </div>
                <CardDescription>Preview of uploaded activity records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Activity Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Tower</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedActivities.map((activity, idx) => (
                        <TableRow key={idx} data-testid={`activity-row-${idx}`}>
                          <TableCell className="font-medium">{activity.user}</TableCell>
                          <TableCell>{activity.activityType}</TableCell>
                          <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                          <TableCell>{activity.durationMinutes} min</TableCell>
                          <TableCell>{activity.tower || "-"}</TableCell>
                          <TableCell>{activity.category || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md mt-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-400">
                    Activity data processed and saved successfully
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-employees">
              {stats?.find((s) => s.type === "employee")?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total JDs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-jds">
              {stats?.find((s) => s.type === "jd")?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Uploaded documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CVs</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-cvs">
              {stats?.find((s) => s.type === "cv")?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Files</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono" data-testid="text-total-activity">
              {stats?.find((s) => s.type === "activity")?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Processed successfully</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
