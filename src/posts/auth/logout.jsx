import { remove } from "../../components/localStorage";

export default function SignOut() {
    remove('profile');
    remove('token');
}