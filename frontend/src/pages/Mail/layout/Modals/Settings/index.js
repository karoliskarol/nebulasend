import Modal from "components/ui/Modal";
import ChangePassword from "./ChangePassword";
import ChangeRecipient from "./ChangeRecipient";

const Settings = () => {
    return ( 
        <Modal id="settings" heading="Settings">
            <ChangePassword />
            <ChangeRecipient />
        </Modal>
     );
}
 
export default Settings;