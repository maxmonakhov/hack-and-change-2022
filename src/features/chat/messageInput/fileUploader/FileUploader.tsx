import { memo } from 'react';

import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { config } from '../../../../config';
import { PaperClip } from '../../../../components/icons';
import clsx from 'clsx';

const uploader = Uploader({
  apiKey: config.fileUploaderAPIKey
});

const options = {
  multi: true,
  editor: {
    images: {
      crop: false
    }
  },
  maxFileCount: 1,
  maxFileSizeBytes: 5 * 1024 * 1024,
  mimeTypes: ['image/jpeg', 'application/pdf']
};

type FileUploaderProps = {
  onUpload(fileUrl: string): void;
  isDisabled?: boolean;
};

const FileUploader = (props: FileUploaderProps) => {
  const { onUpload, isDisabled = false } = props;

  return (
    <UploadButton
      uploader={uploader}
      options={options}
      onComplete={(files) => {
        if (files.length !== 0) {
          onUpload(files[0].fileUrl);
        }
      }}
    >
      {({ onClick }) => (
        <button
          disabled={isDisabled}
          className={clsx({ 'text-slate-300': isDisabled })}
          onClick={onClick}
        >
          <PaperClip />
        </button>
      )}
    </UploadButton>
  );
};

export default memo(FileUploader);
