import React from "react";
import { Login } from "./Login";
import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export const LoginButton = ({ isOpen, onOpen, onClose, userName }) => {
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <div>
      {" "}
      {userName ? (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={onOpen}>Login</MenuItem>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Login onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
