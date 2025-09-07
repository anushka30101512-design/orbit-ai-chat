import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, Files as FilesIcon, Download, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  linkedAssistant?: string;
  linkedCall?: string;
  uploadDate: string;
  url?: string;
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Product_Catalog_2024.pdf",
    size: "2.4 MB",
    type: "pdf",
    linkedAssistant: "Sales Assistant",
    uploadDate: "2024-01-15",
    url: "#",
  },
  {
    id: "2",
    name: "Customer_FAQ.docx",
    size: "156 KB",
    type: "docx",
    linkedAssistant: "Customer Support",
    uploadDate: "2024-01-14",
    url: "#",
  },
  {
    id: "3",
    name: "Technical_Manual.pdf",
    size: "5.1 MB",
    type: "pdf",
    linkedAssistant: "Technical Support",
    linkedCall: "Call #3",
    uploadDate: "2024-01-12",
    url: "#",
  },
  {
    id: "4",
    name: "Training_Data.csv",
    size: "892 KB",
    type: "csv",
    uploadDate: "2024-01-10",
    url: "#",
  },
];

export default function Files() {
  const [files, setFiles] = useState(mockFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.linkedAssistant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "docx":
      case "doc":
        return "📝";
      case "csv":
      case "xlsx":
        return "📊";
      case "txt":
        return "📄";
      default:
        return "📎";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.name.split(".").pop() || "unknown",
        uploadDate: new Date().toISOString().split("T")[0],
      };

      setFiles((prev) => [newFile, ...prev]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    toast({
      title: "File Deleted",
      description: "File has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FilesIcon className="h-8 w-8 text-primary" />
          Files
        </h1>
        <Button
          className="btn-hero"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="text-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drag and drop files here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse and upload files
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            multiple
            accept=".pdf,.txt,.csv,.docx,.doc,.xlsx"
          />
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files ({filteredFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{file.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(file.uploadDate).toLocaleDateString()}</span>
                      {file.linkedAssistant && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {file.linkedAssistant}
                          </Badge>
                        </>
                      )}
                      {file.linkedCall && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {file.linkedCall}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FilesIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms." : "Upload your first file to get started."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}