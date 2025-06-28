"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Trash2, Plus } from "lucide-react";

interface Quote {
  id: string;
  text: string;
  author: string;
  order: number;
}

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuote, setNewQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error</div>
            <div className="text-sm">Failed to fetch quotes</div>
          </div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuote = async () => {
    if (!newQuote.text || !newQuote.author) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newQuote,
          order: quotes.length,
        }),
      });

      if (response.ok) {
        await fetchQuotes();
        setNewQuote({ text: "", author: "" });
        toast.success(
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="font-medium">Success</div>
              <div className="text-sm">Quote added successfully!</div>
            </div>
          </div>
        );
      } else {
        throw new Error('Failed to add quote');
      }
    } catch (error) {
      console.error('Error adding quote:', error);
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error</div>
            <div className="text-sm">Failed to add quote</div>
          </div>
        </div>
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchQuotes();
        toast.success(
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="font-medium">Success</div>
              <div className="text-sm">Quote deleted successfully!</div>
            </div>
          </div>
        );
      } else {
        throw new Error('Failed to delete quote');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error</div>
            <div className="text-sm">Failed to delete quote</div>
          </div>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quotes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your inspirational quotes
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
        <h1 className="text-3xl font-bold">Quotes</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your inspirational quotes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Quote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="quote" className="block text-sm font-medium mb-2">
              Quote Text
            </label>
            <Textarea
              id="quote"
              value={newQuote.text}
              onChange={(e) => setNewQuote(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter the quote text..."
              className="min-h-[100px]"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author
            </label>
            <Input
              id="author"
              value={newQuote.author}
              onChange={(e) => setNewQuote(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Enter the author's name..."
            />
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddQuote} 
              disabled={saving || !newQuote.text || !newQuote.author}
              className="min-w-[100px]"
            >
              <Plus className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Quote"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div 
                key={quote.id}
                className="p-4 border rounded-lg dark:border-gray-800 flex justify-between items-start"
              >
                <div>
                  <p className="text-lg italic mb-2">&ldquo;{quote.text}&rdquo;</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">— {quote.author}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteQuote(quote.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {quotes.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No quotes added yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 