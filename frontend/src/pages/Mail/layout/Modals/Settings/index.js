import Modal from "../../../../../components/ui/Modal";
import ChangePassword from "./ChangePassword";

const Settings = () => {
    return ( 
        <Modal id="settings" heading="Settings">
            <ChangePassword />
        </Modal>
     );
}
 
export default Settings;