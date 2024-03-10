import battleNetLogo from '../components/UI/logos/battlenet-logo.png';
import '../components/UI/styles/steam-login-button.css';

export const BattleNetLoginButton = () => {
  return (
    <div className="button-container">
      <img src={battleNetLogo} alt="BattleNet Logo" width="50" height="50" />
    </div>
  );
};
