import { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Drawer from 'components/ui/Drawer';
import DomainForm from './DomainForm.jsx';
import { closeDomainModal } from 'store/slices/domainSlice.js';
import { Button } from 'components/ui';

const DrawerFooter = ({ onSaveClick, onCancel }) => {
  return (
    <div className='text-right w-full'>
      <Button onClick={onCancel} variant='danger' className='mr-2'>
        Cancel
      </Button>
      <Button onClick={onSaveClick}>Save</Button>
    </div>
  );
};

const DomainDrawer = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.domainUi);
  const domainFormRef = useRef(null);

  const onDrawerClose = () => {
    dispatch(closeDomainModal());
  };

  const formSubmit = async () => {
    await domainFormRef.current.submitForm();
  };

  return (
    <Drawer
      isOpen={isModalOpen}
      closable={false}
      bodyClass='p-0'
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
    >
      <DomainForm ref={domainFormRef} />
    </Drawer>
  );
};

export default DomainDrawer;
