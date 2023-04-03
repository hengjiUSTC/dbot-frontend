import { styled } from '@mui/material/styles';
import { Paper, List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useState } from 'react';
import { UploadButton } from 'react-uploader';
import { UPLOADER_API } from '@/config-global';
import { Uploader } from 'uploader';

const StyledListContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));

interface ImageSelectProps {
  onSelect: (image: string) => void;
  photoUrl: string;
}

type ImagesToSelect = {
  image: string;
  isUser: boolean;
};

// Configuration for the uploader
const uploader = Uploader({
  apiKey: UPLOADER_API,
});

const options = {
  multi: false,
  styles: {
    colors: {
      primary: '#377dff',
    },
  },
  editor: {
    images: {
      crop: true,
      cropRatio: 1 / 1,
      cropShape: 'rect' as const,
    },
  },
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  container: 'div',
};

const DEFAULT_IMAGES: ImagesToSelect[] = [
  { image: '/assets/bot_1.png', isUser: false },
  { image: '/assets/bot_2.jpeg', isUser: false },
];
export const ImageSelect = ({ onSelect, photoUrl }: ImageSelectProps) => {
  const [images, setImages] = useState<ImagesToSelect[]>(DEFAULT_IMAGES);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    onSelect(images[index].image);
  };

  // --------------------------
  // Create an upload button...
  // --------------------------

  const MyUploadButton = () => (
    <UploadButton
      uploader={uploader}
      options={options}
      onComplete={(files) => {
        if (files.length === 0) {
          console.log('No files selected.');
        } else if (files.length === 1) {
          console.log('Files uploaded:');
          const file = files.map((f) => f.fileUrl);
          setImages((prev) => [
            ...prev,
            {
              image: file[0],
              isUser: true,
            },
          ]);
        }
      }}
    >
      {({ onClick }) => (
        <button
          style={{
            margin: '0 auto 10px auto',
            display: 'block',
            padding: '14px 17px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '400',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          Upload a file...
        </button>
      )}
    </UploadButton>
  );

  return (
    <StyledListContainer>
      <List>
        {images.map((i, _index) => {
          return (
            <ListItemButton
              key={_index}
              selected={photoUrl === i.image}
              onClick={(event) => handleListItemClick(event, _index)}
            >
              <ListItemAvatar>
                <Avatar variant="rounded" src={i.image} />
              </ListItemAvatar>
              <ListItemText primary={i.isUser ? '选择已上传的图片' : '选择系统图片'} />
            </ListItemButton>
          );
        })}
        <MyUploadButton />
      </List>
    </StyledListContainer>
  );
};
