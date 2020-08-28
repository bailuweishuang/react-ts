import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';
import UploadList from './upload-list';
import Drag from './drag';
export type uploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface IUploadFile {
  uid: string;
  name: string;
  size: number;
  status?: uploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface IUploadProps {
  /**上传地址 */
  action: string;
  /**上传进度 */
  onProgress?: (percentage: number, file: File) => void;
  /**上传成功返回 */
  onSuccess?: (data: any, file: File) => void;
  /**上传失败返回 */
  onError?: (err: any, file: File) => void;
  /**上传之前 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**改变上传 */
  onChange?: (file: File) => void;
  /**删除 */
  onRemove?: (file: IUploadFile) => void;
  /**默认显示 */
  defaultFileList?: IUploadFile[];
  /**发到后台的文件参数名 */
  name?: string;
  /**设置上传的请求头部 */
  header?: { [key: string]: any };
  /**上传所需额外参数或返回上传额外参数的方法 */
  data?: { [key: string]: any };
  /**上传请求时是否携带 cookie */
  withCredentials?: boolean;
  /**接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽 */
  drag?: boolean;
}
/**
 * 上传
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'react-ts'
 * ~~~
 */
export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    defaultFileList,
    withCredentials,
    name,
    header,
    data,
    accept,
    multiple,
    children,
    drag
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<IUploadFile[]>(defaultFileList || []);
  const handleClick = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    uploadhandle(file);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const uploadhandle = (files: FileList) => {
    const newFiles = Array.from(files);
    newFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((res) => {
            post(res);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const uploadFileLiset = (updateFile: IUploadFile, updateObj: Partial<IUploadFile>) => {
    setUploadFile((preLiset) => {
      return preLiset.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const post = (file: File) => {
    let _file: IUploadFile = {
      uid: Date.now() + 'uplod-file',
      name: file.name,
      size: file.size,
      percent: 0,
      status: 'ready',
      raw: file
    };
    setUploadFile((preList) => {
      return [_file, ...preList];
    });
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((item) => {
        formData.append(item, data[item]);
      });
    }
    formData.append(name, file);
    axios
      .post(action, formData, {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            uploadFileLiset(_file, { percent: percentage, status: 'uploading' });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      })
      .then((res) => {
        uploadFileLiset(_file, { status: 'success', response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((e) => {
        uploadFileLiset(_file, { status: 'error', error: e });
        if (onError) {
          onError(e, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  const handleRemove = (file: IUploadFile) => {
    setUploadFile((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  return (
    <div>
      <div style={{display: 'inline-block'}} onClick={handleClick}>
        {drag ? <Drag onFile={(file) => uploadhandle(file)}>{children}</Drag> : children}
        <input
          type="file"
          className="input"
          style={{
            display: 'none'
          }}
          onChange={inputChange}
          ref={inputRef}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={uploadFile} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file'
};
export default Upload;
