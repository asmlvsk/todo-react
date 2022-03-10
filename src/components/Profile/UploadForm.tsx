import { Box, Button, Container } from '@mui/material';
import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { DirectUpload } from 'activestorage';
import {
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
  base64StringtoFile,
} from '../../helpers/uploadHelper';
import { IUserInfo } from '../../interfaces/interfaces';

const CROP_DEFAULTS: Crop = {
  aspect: 1 / 1,
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  unit: 'px',
};

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxWidth: 'sm',
};

type IProps = {
  handleClose: () => void;
  image: File | undefined;
  canvasRef: RefObject<HTMLCanvasElement>;
  updateUserAvatarHandler: (id: number, avatar: string) => void;
  user: IUserInfo | null;
};

const ModalForm: FC<IProps> = function ({
  handleClose,
  image,
  canvasRef,
  updateUserAvatarHandler,
  user,
}) {
  const imgRef = useRef(null);
  const [src, setSrc] = useState<string>();
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: CROP_DEFAULTS.width,
    height: CROP_DEFAULTS.height,
    aspect: CROP_DEFAULTS.aspect,
    x: 0,
    y: 0,
  });

  const onImageLoaded = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onChange = (cropParams: typeof crop) => {
    setCrop(cropParams);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setSrc(undefined);
    }
  }, [image]);

  const handleCrop = (pixelCrop: typeof crop, percentageCrop: typeof crop) => {
    const canvas = canvasRef.current;
    image64toCanvasRef(canvas as HTMLCanvasElement, src as string, pixelCrop);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (src) {
      const fileExt = extractImageFileExtensionFromBase64(src as string);

      const fileName = `image.${fileExt}`;

      const imageData64 = canvasRef.current?.toDataURL();

      const newCroppedFile = base64StringtoFile(imageData64, fileName);

      const upload = new DirectUpload(
        newCroppedFile,
        'http://localhost:4000/rails/active_storage/direct_uploads'
      );

      upload.create((error, blob) => {
        if (!error) {
          updateUserAvatarHandler(user!.id, blob.signed_id);
          handleClose();
        }
      });
    }
  };

  return (
    <Container maxWidth="md" sx={style}>
      <Box>
        <ReactCrop
          src={src!}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={handleCrop}
          onChange={onChange}
        />
      </Box>

      <Button onClick={handleClose}>Cancel</Button>
      <Button type="button" onClick={handleSubmit}>
        Send
      </Button>
    </Container>
  );
};

export default ModalForm;
