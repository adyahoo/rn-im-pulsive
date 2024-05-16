/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, {ComponentProps} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import ImagePicker from '../picker/ImagePicker';

interface Props {
  name: string;
}

export default function RHFImagePicker({
  name,
  ...rest
}: Props & ComponentProps<typeof ImagePicker>) {
  const {control, setValue, clearErrors} = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field, fieldState}) => {
          return (
            <ImagePicker
              initialImageUrl={'data:image/png;base64,' + field.value}
              error={fieldState.error != undefined}
              errorText={fieldState.error?.message}
              onDeleteImage={() => {
                setValue(name, undefined);
              }}
              onChangeImageBase64={imageBase64 => {
                setValue(name, imageBase64);
                clearErrors(name);
              }}
              // onChangeImageUrl={(val) => {
              //   setValue(name, val);
              //   clearErrors(name);
              // }}
              {...rest}
            />
          );
        }}
      />
    </>
  );
}
