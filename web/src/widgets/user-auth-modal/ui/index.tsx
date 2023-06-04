import { useState } from 'react';
import { Modal } from 'shared/ui/modal';
import { SignIn } from './blocks/sign-in';
import { SignUp } from './blocks/sign-up';

type Props = { action: 'signUp' | 'signIn'; closeModal: () => void };

export function UserAuthModal({ action: actionParam, closeModal }: Props) {
  const [action, setAction] = useState(actionParam);

  return (
    <Modal alignX="center" alignY="center" autoClose={closeModal}>
      {action === 'signUp' ? (
        <SignUp setAction={setAction} closeModal={closeModal} />
      ) : (
        <SignIn setAction={setAction} closeModal={closeModal} />
      )}
    </Modal>
  );
}
