import FocusTrap from "focus-trap-react";
import "./login.css";
import { useLogin } from "@/hooks/useLogin";

interface Props {
  onClose: () => void;
}
export const Login = ({ onClose }: Props) => {
  const { mutateAsync } = useLogin();
  return (
    <div className="modalWrapper">
      <FocusTrap>
        <div className="modal" role="dialog" aria-modal="true">
          <h2>Login</h2>
          <form
            onSubmit={async (formData) => {
              await mutateAsync(formData);
              onClose();
            }}
          >
            <label>
              <span>Username:</span>
              <input type="text" name="username" autoFocus required />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" required />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button onClick={onClose} type="button" className="close">
            X
          </button>
        </div>
      </FocusTrap>
    </div>
  );
};
