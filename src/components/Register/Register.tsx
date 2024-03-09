import FocusTrap from "focus-trap-react";
import { useRegister } from "@/hooks";

interface Props {
  onClose: () => void;
}
export const Register = ({ onClose }: Props) => {
  const { mutateAsync, isPending, isError, error } = useRegister();
  return (
    <div className="modalWrapper">
      <FocusTrap>
        <div className="modal" role="dialog" aria-modal="true">
          <form onSubmit={async (formData) => {
            await mutateAsync(formData);
            onClose();
          }}
          >
            <h2>Register</h2>
            <label>
              <span>First Name:</span>
              <input type="text" name="firstname" autoFocus required />
            </label>
            <label>
              <span>Username:</span>
              <input type="text" name="username" autoFocus required />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" required />
            </label>
            <button type="submit" className="containedButton">Submit</button>
            {isError && <p className="error">{error.message}</p>}
          </form>
          <button onClick={onClose} type="button" className="close" disabled={isPending}>
            X
          </button>
        </div>
      </FocusTrap>
    </div>
  );
};
