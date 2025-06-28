"use client";

import { useEffect, useState } from 'react';
import { Profile, profileApi, ProfileInput } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import ImageUpload from '@/components/ui/image-upload';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { startProgress, doneProgress } from '@/lib/nprogress';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileInput & { id?: string }>({
    name: '',
    title: '',
    bio: '',
    avatarUrl: '',
    email: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    resumeUrl: '',
    calLink: '',
    showAvatar: true,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    startProgress();
    
    try {
      const data = await profileApi.get();
      setProfile(data);
      setFormData(data);
      setError(null);
      doneProgress();
    } catch (err: unknown) {
      const error = err as { response?: { status: number } };
      if (error.response?.status === 404) {
        // No profile exists yet, that's okay
        setProfile(null);
      } else {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
        
        doneProgress();
        toast.error(
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <div className="font-medium">Error Loading Profile</div>
              <div className="text-sm">Failed to load profile data. Please refresh the page.</div>
            </div>
          </div>
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (url: string) => {
    setFormData(prev => ({ ...prev, avatarUrl: url }));
  };

  const handleShowAvatarChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, showAvatar: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    startProgress();
    
    try {
      if (profile?.id) {
        // Update existing profile
        await profileApi.update({ ...formData, id: profile.id });
      } else {
        // Create new profile
        await profileApi.create(formData);
      }
      await fetchProfile();
      
      doneProgress();
      toast.success(
        <div className="flex">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <div className="font-medium">Profile Saved</div>
            <div className="text-sm">Your profile information has been updated successfully.</div>
          </div>
        </div>
      );
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile data');
      
      doneProgress();
      toast.error(
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <div className="font-medium">Error Saving Profile</div>
            <div className="text-sm">Failed to save profile data. Please try again.</div>
          </div>
        </div>
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Personal Information</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update your personal information and social links
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Full Stack Developer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                className="min-h-[120px]"
                placeholder="Write a short bio about yourself"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="avatarUrl">Profile Avatar</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="showAvatar" className="text-sm text-gray-500">Show on website</Label>
                  <Switch
                    id="showAvatar"
                    checked={formData.showAvatar}
                    onCheckedChange={handleShowAvatarChange}
                  />
                </div>
              </div>
              <ImageUpload
                value={formData.avatarUrl || ''}
                onChange={handleAvatarChange}
                className="w-full max-w-xs"
                height="h-40"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a profile picture (recommended size: 400x400px)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  name="twitterUrl"
                  value={formData.twitterUrl || ''}
                  onChange={handleChange}
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume URL</Label>
                <Input
                  id="resumeUrl"
                  name="resumeUrl"
                  value={formData.resumeUrl || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calLink">Scheduling Link (Cal.com)</Label>
              <Input
                id="calLink"
                name="calLink"
                value={formData.calLink || ''}
                onChange={handleChange}
                placeholder="https://cal.com/username"
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 