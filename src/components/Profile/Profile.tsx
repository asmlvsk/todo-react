import React, {
  ChangeEvent,
  createRef,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Modal } from '@mui/material';
import { IUserInfo } from '../../interfaces/interfaces';
import UploadForm from './UploadForm';
import UploadButton from './UploadButton';

type IProps = {
  user: IUserInfo | null;
  updateUserAvatarHandler: (id: number, avatar: string) => void;
};

const Profile: FC<IProps> = function ({ user, updateUserAvatarHandler }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | undefined>();
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    setImage(image);
  }, [image]);

  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSelectFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if (files?.[0]) {
      const MAX_FILE_SIZE = 10240000;
      const file = files[0];

      if (file.size <= MAX_FILE_SIZE) {
        setImage(file);
        handleOpen();
      }
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <h3>Nickname: {user?.user.name}</h3>
      <h3>Email: {user?.user.email}</h3>
      <img
        src={user?.avatar}
        alt="avatar"
        style={{ borderRadius: '50%', maxWidth: '100px' }}
      />
      <canvas
        ref={canvasRef}
        style={{ visibility: 'hidden', maxWidth: '10px' }}
      />
      <UploadButton onSelectFile={onSelectFile} fileInputRef={fileInputRef} />
      <Modal open={open} onClose={handleClose}>
        <UploadForm
          handleClose={handleClose}
          image={image}
          canvasRef={canvasRef}
          updateUserAvatarHandler={updateUserAvatarHandler}
          user={user}
        />
      </Modal>
    </div>
  );
};

export default Profile;
