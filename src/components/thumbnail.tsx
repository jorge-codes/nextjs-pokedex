import React from 'react';
import Image from 'next/image';

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';

interface ThumbnailProps {
  id: string;
  name: string;
  img: string;
  party: boolean;
  onClicked?: (id: string) => void;
  onButtonClicked?: (id: string, party: boolean) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ id, name, img, party, onClicked, onButtonClicked }) => {
  const handleThumbnailClick = () => {
    onClicked?.(id);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onButtonClicked?.(id, party);
  };

  const altText = `Image of ${name}`;
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
      <CardContent className='flex justify-center'>
        <Image src={img} alt={altText} height={100} width={100} />
      </CardContent>
      <CardFooter>
        <CardDescription>#{id.padStart(3, '0')}</CardDescription>
      </CardFooter>
    </Card>
  );
};
