'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { communityPosts } from '@/lib/data';
import { useUser } from '@/lib/hooks/use-user';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users } from 'lucide-react';

export default function CommunityPage() {
  const { publicMode } = useUser();

  if (!publicMode) {
    return (
      <Alert>
        <Users className="h-4 w-4" />
        <AlertTitle>Private Mode is On</AlertTitle>
        <AlertDescription>
          To view and interact with the community, please enable Public Support
          Mode in the header settings.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Community Feed</h2>
        <p className="text-muted-foreground">
          You are not alone. See shared experiences from others.
        </p>
      </div>
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{post.problem}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{post.ageGroup}</Badge> - Posted{' '}
                {post.time}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments} Comments</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.supports} Supports</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
