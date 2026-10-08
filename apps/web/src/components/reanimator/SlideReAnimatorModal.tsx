import React from 'react';
import { Modal } from 'antd';
import { SlideReAnimatorView } from './SlideReAnimatorView';

export interface SlideReAnimatorModalProps {
  open: boolean;
  onClose: () => void;
}

export const SlideReAnimatorModal: React.FC<SlideReAnimatorModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1280}
      styles={{
        content: {
          backgroundColor: '#171717',
          border: '1px solid #2F2F2F',
          borderRadius: '16px',
          padding: '16px',
          maxHeight: '90vh',
          overflowY: 'auto'
        },
        header: {
          display: 'none'
        }
      }}
      destroyOnHidden
    >
      <SlideReAnimatorView onBackToDashboard={onClose} />
    </Modal>
  );
};
