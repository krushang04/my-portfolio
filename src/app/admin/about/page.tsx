"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

export default function AboutAdminPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      setContent(data.content || '');
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error</div>
            <div className="text-sm">Failed to fetch about content</div>
          </div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        toast.success(
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="font-medium">Success</div>
              <div className="text-sm">About content updated successfully!</div>
            </div>
          </div>
        );
      } else {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating about content:', error);
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error</div>
            <div className="text-sm">Failed to update about content</div>
          </div>
        </div>
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">About Content</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your about page content
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Content</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your about page content
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content (HTML supported)
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your about page content here. You can use HTML tags for formatting."
              className="min-h-[300px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can use HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, etc.
            </p>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="min-w-[100px]"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-gray-500 italic">No content to preview</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 