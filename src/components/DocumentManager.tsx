import React, { useState } from 'react';
import { Upload, FileText, AArrowDown as Pdf, Download, Search, Filter, Plus, Trash2, Eye, BookOpen } from 'lucide-react';

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Advanced Calculus Notes.pdf',
      type: 'pdf',
      size: '2.4 MB',
      subject: 'Mathematics',
      uploadDate: '2024-01-15',
      processed: true,
      questionsGenerated: 25
    },
    {
      id: 2,
      name: 'Physics Quantum Mechanics.pdf',
      type: 'pdf',
      size: '4.1 MB',
      subject: 'Physics',
      uploadDate: '2024-01-14',
      processed: true,
      questionsGenerated: 18
    },
    {
      id: 3,
      name: 'Organic Chemistry Basics.txt',
      type: 'txt',
      size: '856 KB',
      subject: 'Chemistry',
      uploadDate: '2024-01-13',
      processed: false,
      questionsGenerated: 0
    }
  ]);

  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : 'txt',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        subject: 'Uncategorized',
        uploadDate: new Date().toISOString().split('T')[0],
        processed: false,
        questionsGenerated: 0
      };
      setDocuments(prev => [...prev, newDoc]);
    });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || doc.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const processDocument = (id: number) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, processed: true, questionsGenerated: Math.floor(Math.random() * 30) + 10 }
        : doc
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Manager</h1>
          <p className="text-gray-600">Upload and manage your educational content</p>
        </div>
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Upload Document
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 bg-white/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Drop your documents here
        </h3>
        <p className="text-gray-600 mb-4">
          Support for PDF and TXT files up to 50MB
        </p>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-md transition-all">
          Browse Files
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  document.type === 'pdf' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}>
                  {document.type === 'pdf' ? (
                    <Pdf className="w-6 h-6 text-white" />
                  ) : (
                    <FileText className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm truncate max-w-32">
                    {document.name}
                  </h3>
                  <p className="text-gray-500 text-xs">{document.size}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium text-gray-900">{document.subject}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uploaded:</span>
                <span className="font-medium text-gray-900">{document.uploadDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  document.processed ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {document.processed ? 'Processed' : 'Processing...'}
                </span>
              </div>
            </div>

            {document.processed ? (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-700">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {document.questionsGenerated} questions generated
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => processDocument(document.id)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:shadow-md transition-all text-sm font-medium mb-4"
              >
                Process Document
              </button>
            )}

            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-md transition-all text-sm font-medium">
              Generate Assessment
            </button>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Upload some documents to get started with your learning journey.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;