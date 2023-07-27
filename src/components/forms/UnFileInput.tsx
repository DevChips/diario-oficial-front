import {Button, Typography} from '@mui/material'
import {useField} from '@unform/core'
import {useEffect, useState} from 'react'

type TUnformFileInputProps = {
  name: string
  disabled: boolean
  // image64Error: string
}

export const UnFileInput: React.FC<TUnformFileInputProps> = ({
  name,
  disabled,
  // image64Error,
  ...rest
}) => {
  const {fieldName, registerField, defaultValue, error, clearError} = useField(name)
  const [value, setValue] = useState(defaultValue || '')

  // const fileToBase64 = (file, cb) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(null, reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     cb(error, null);
  //   };
  // };

  const onUploadFileChange = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || ''
      const fileType: string = fileRef.type || ''
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload = (ev: any) => {
        // convert it to base64
        setValue(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <>
      <Button
        variant='outlined'
        disableElevation
      >
        <input
          {...rest}
          type='file'
          disabled={disabled}
          accept='application/pdf'
          // value={value}
          defaultValue={defaultValue}
          onChange={(e) => onUploadFileChange(e.target.files)}
          onKeyDown={() => error && clearError()}
        />
      </Button>
      <Typography
        fontSize={14}
        color='red'
      >
        {error}
      </Typography>
    </>
  )
}
