/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import { useTheme } from "../../core/theming";
import { usePermission } from "../../providers/PermissionProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";
import { ImageBackground, Modal, View, ViewStyle } from "react-native";
import { Button, HelperText, Icon, IconButton } from "../../index";
import ImagePickerBottomSheet, { ImagePickerBSProps } from "../BottomSheet/ImagePickerBottomSheet";
import color from "color";
import ImageViewer from "react-native-image-zoom-viewer";
import Portal from "../Portal/Portal";
import { useLocale } from "../../../src/providers/LocaleProvider";
import LabelInput from "../TextInput/Label/LabelInput";
import Typography from "../Typography/Typography";

interface Props {
  label?: string;
  requiredLabel?: boolean;
  description?: string;
  buttonProps?: ComponentProps<typeof Button>;
  buttonTitle?: string;
  pickerTitle?: string;
  editable?: boolean;
  initialImageUrl?: string;
  error?: boolean;
  errorText?: string;
  style?: ViewStyle;
}

export default function ImagePicker({
                                      initialImageUrl,
                                      buttonProps,
                                      description,
                                      buttonTitle,
                                      pickerTitle,
                                      editable = true,
                                      error,
                                      errorText,
                                      style,
                                      ...rest
                                    }: Props & ImagePickerBSProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowViewer, setIsShowViewer] = useState(false);
  const { colors, roundness } = useTheme();
  const { t } = useLocale();
  const { requestPermissions } = usePermission();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>("");
  const handleOpenImagePicker = () => {
    requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS], () => {
      setIsOpen(true);
    });
  };
  
  useEffect(() => {
    if (rest.onChangeImage) {
      rest.onChangeImage(selectedImageUrl);
    }
  }, [selectedImageUrl]);

  const handleOpenViewer = () => {
    setIsShowViewer(true);
  };

  useEffect(() => {
    if (initialImageUrl) {
      setSelectedImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);


  const ImagePlaceHolderIcon = () => {
    const size = 70;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: colors.primary.border,
      }}>
        <Icon icon={"image"} color={colors.primary.main} size={size / 2 + 10} />
      </View>
    );
  };

  const ImageViewerButton = () => {
    const size = 70;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: color(colors.primary.focus).alpha(0.2).rgb().string(),
      }}>
        <IconButton
          onPress={handleOpenViewer}
          size={size / 3}
          variant={"tertiary"}
          icon={"search"} />
        {/*<Icon icon={"image"} color={colors.primary.main} size={size / 2 + 10} />*/}
      </View>
    );
  };

  return (
    <>
      <Portal>
        <Modal
          onRequestClose={() => {
            setIsShowViewer(false);
          }}
          visible={isShowViewer} animationType={"fade"}>
          <ImageViewer
            renderIndicator={() => null}
            show={isShowViewer}
            imageUrls={[
              {
                url: selectedImageUrl,
              },
            ]} />
        </Modal>
      </Portal>
      <ImagePickerBottomSheet
        camera={rest.camera}
        gallery={rest.gallery}
        ratio={rest.ratio}
        crop={rest.crop}
        open={isOpen}
        onChangeImage={(image) => {
          setIsOpen(false);
          setSelectedImageUrl(image.path);
        }}
        onClose={() => {
          setIsOpen(false);
        }} />

      <View style={[style]}>
        {
          rest.label &&
          <View>
            <LabelInput
              style={{
                marginBottom: 8,
              }}
              label={rest?.label}
              required={rest?.requiredLabel} />
          </View>
        }
        <View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: 160,
          width: "100%",
          borderRadius: roundness,
          backgroundColor: colors.primary.surface,
          position: "relative",
        }}>
          {
            !selectedImageUrl
              ? <ImagePlaceHolderIcon />
              : <ImageBackground
                borderRadius={roundness}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                source={{
                  uri: selectedImageUrl,
                }}
              >
                <ImageViewerButton />
              </ImageBackground>
          }
        </View>
        <View style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {(description || errorText) &&
            <View style={{
              marginTop: 8,
            }}>
              {
                (error && errorText) &&
                <HelperText
                  style={{
                    textAlign: "center",
                  }}
                  type={"error"}>{errorText}</HelperText>
              }
              {
                description &&
                <Typography
                  type={"body3"}
                  style={{
                    textAlign: "center",
                  }}>
                  {description}
                </Typography>
              }
            </View>
          }
          {
            editable &&
            <Button
              size={buttonProps?.size ?? "sm"}
              containerStyle={{
                marginTop: 8,
              }}
              variant={buttonProps?.variant ?? "secondary"}
              onPress={handleOpenImagePicker}
              {...buttonProps}
            >
              {
                buttonTitle ??
                t("pick_image")
              }
            </Button>
          }
        </View>
      </View>
    </>
  );
}