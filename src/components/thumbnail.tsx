import React from 'react';
import Image from 'next/image';

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';

interface ThumbnailProps {
  id: string;
  name: string;
  url: string;
  img: string | undefined;
  party: boolean;
  onClicked?: (id: string) => void;
  onButtonClicked?: (id: string) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ id, name, img, url, party, onClicked, onButtonClicked }) => {
  const handleThumbnailClick = () => {
    onClicked?.(id);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onButtonClicked?.(id);
  };

  const buttonVariant = party ? 'default' : 'outline';
  return (
    <Card onClick={handleThumbnailClick}>
      <Button
        onClick={handleButtonClick}
        className='float-right clear-both mt-2 mr-2'
        variant={buttonVariant}
        size='icon'
      >
        {party ? <MinusIcon /> : <PlusIcon />}
      </Button>
      <CardHeader>
        <CardTitle className='capitalize'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <Image src={src} alt={alt} width={width} height={height} layout='responsive' objectFit='cover' /> */}
      </CardContent>
      <CardFooter>
        <CardDescription>#{id.toString().padStart(3, '0')}</CardDescription>
      </CardFooter>
    </Card>
  );
};
