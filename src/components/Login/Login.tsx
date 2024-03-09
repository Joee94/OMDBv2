import FocusTrap from "focus-trap-react";
import { useLogin } from "@/hooks";

interface Props {
  onClose: () => void;
}
export const Login = ({ onClose }: Props) => {
  const { mutateAsync, isPending, isError, error } = useLogin();
  return (
    <div className="modalWrapper">
      <FocusTrap>
        <div className="modal" role="dialog" aria-modal="true">
          <form
            onSubmit={async (formData) => {
              await mutateAsync(formData);
              onClose();
            }}
          >
            <h2>Login</h2>
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
