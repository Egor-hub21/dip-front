import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Text,
} from "@chakra-ui/react";

interface ActionButtonWithPopoverProps {
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonLabel?: string;
  buttonVariant?: string;
  buttonColor?: string;
  confirmationText?: string;
  confirmationHeader?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColorScheme?: string;
  cancelButtonColorScheme?: string;
  buttonSize?: string;
}

const ActionButtonWithPopover: React.FC<ActionButtonWithPopoverProps> = ({
  onConfirm,
  onCancel,
  isOpen,
  onOpen,
  onClose,
  buttonLabel = "Действие",
  buttonVariant = "outline",
  buttonColor = "blue.500",
  confirmationText = "Вы уверены, что хотите выполнить это действие?",
  confirmationHeader = "Подтверждение",
  confirmButtonText = "Да",
  cancelButtonText = "Нет",
  confirmButtonColorScheme = "blue",
  cancelButtonColorScheme = "gray",
  buttonSize = "xs",
}) => {
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          variant={buttonVariant}
          color={buttonColor}
          size={buttonSize}
          onClick={onOpen}
        >
          {buttonLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="sm">{confirmationHeader}</PopoverHeader>
        <PopoverBody>
          <Text fontSize="sm">{confirmationText}</Text>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <Button
            colorScheme={confirmButtonColorScheme}
            ml={2}
            size="xs"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </Button>
          <Button
            colorScheme={cancelButtonColorScheme}
            ml={2}
            size="xs"
            onClick={() => {
              onCancel?.();
              onClose();
            }}
          >
            {cancelButtonText}
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ActionButtonWithPopover;
