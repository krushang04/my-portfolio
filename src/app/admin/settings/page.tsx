"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  UserCog, 
  Cloud, 
  Save
} from 'lucide-react';
import { toast } from "sonner";

function SettingsContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || "site");
  
  // Site settings state
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteKeywords, setSiteKeywords] = useState("");
  const [darkModeDefault, setDarkModeDefault] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);

  // Fetch site settings
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const data = await response.json();
          setSiteTitle(data.title || "");
          setSiteDescription(data.description || "");
          setSiteKeywords(data.keywords || "");
          setDarkModeDefault(data.darkModeDefault || false);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
        toast.error('Failed to load site settings');
      }
    };

    if (activeTab === 'site') {
      fetchSiteSettings();
    }
  }, [activeTab]);

  // Save site settings
  const handleSaveSiteSettings = async () => {
    setIsSavingSite(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: siteTitle,
          description: siteDescription,
          keywords: siteKeywords,
          darkModeDefault,
        }),
      });

      if (response.ok) {
        toast.success('Site settings saved successfully');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast.error('Failed to save site settings');
    } finally {
      setIsSavingSite(false);
    }
  };

  // Account form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your portfolio settings and preferences
        </p>
      </div>

      <Tabs defaultValue="site" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Site</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure general settings for your portfolio site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input 
                    id="site-title" 
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="My Portfolio" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input 
                    id="site-description" 
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    placeholder="My professional portfolio and personal website" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="site-keywords">Keywords</Label>
                  <Input 
                    id="site-keywords" 
                    value={siteKeywords}
                    onChange={(e) => setSiteKeywords(e.target.value)}
                    placeholder="portfolio, developer, designer" 
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dark-mode">Dark Mode Default</Label>
                  <Switch 
                    id="dark-mode" 
                    checked={darkModeDefault}
                    onCheckedChange={setDarkModeDefault}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    onClick={handleSaveSiteSettings}
                    disabled={isSavingSite}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSavingSite ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Email</Label>
                  <Input 
                    id="email" 
                    value={session?.user?.email || ""}
                    readOnly
                    disabled
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    value={session?.user?.name || "Admin"}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your admin account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure third-party service integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Cloudinary</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Image hosting and optimization</p>
                    </div>
                    <Switch id="cloudinary-enabled" defaultChecked />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="cloudinary-name">Cloud Name</Label>
                    <Input 
                      id="cloudinary-name" 
                      placeholder="your_cloud_name" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="cloudinary-api-key">API Key</Label>
                    <Input 
                      id="cloudinary-api-key" 
                      placeholder="your_api_key" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="cloudinary-api-secret">API Secret</Label>
                    <Input 
                      id="cloudinary-api-secret" 
                      type="password"
                      placeholder="••••••••••••••••" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Service</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">For contact form submissions</p>
                    </div>
                    <Switch id="email-enabled" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email-service">Service</Label>
                    <select 
                      id="email-service" 
                      className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
                    >
                      <option value="resend">Resend</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="smtp">Custom SMTP</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email-api-key">API Key</Label>
                    <Input 
                      id="email-api-key" 
                      placeholder="your_api_key" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email-from">From Email</Label>
                    <Input 
                      id="email-from" 
                      placeholder="contact@yourdomain.com" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email-to">To Email</Label>
                    <Input 
                      id="email-to" 
                      placeholder="you@example.com" 
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Integrations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
} 