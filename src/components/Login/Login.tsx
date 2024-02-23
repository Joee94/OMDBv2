import FocusTrap from "focus-trap-react";
import "./login.css";

interface Props {
  onClose: () => void;
}

export const Login = ({ onClose }: Props) => {
  return (
    <div className="modalWrapper">
      <FocusTrap>
        <div className="modal" role="dialog" aria-modal="true">
          <h2>Login</h2>
          <form method="post" action="/process-login">
            <label>
              <span>Username:</span>
              <input type="text" name="username" autoFocus />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" />
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
