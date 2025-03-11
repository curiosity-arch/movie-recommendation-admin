import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/button.module.css";
import CreateIcon from "@/public/icons/create.png";
import EditIcon from "@/public/icons/edit.png";
import DeleteIcon from "@/public/icons/delete.png";
import { deleteUser} from "@/app/lib/actions";

export function CreateUser() {
    return (
        <Link href="/dashboard/user/create" className={styles.nodecoration}>
            <button className={styles.buttonCreate}>
                <span>Create</span>
                <Image
                    src={CreateIcon}
                    alt="Create Icon"
                    className={styles.icons}
                />
            </button>
        </Link>
    );
}

export function UpdateUser({ id }: { id: string }) {
    return (
        <Link href={`/dashboard/user/${id}/edit`} passHref>
            <button className={styles.buttonEdit}>
                <Image
                    src={EditIcon}
                    alt="Edit Icon"
                    className={styles.icons}
                />
            </button>
        </Link>
    );
}

export function DeleteUser({ id }: { id: string }) {
    const deleteUserById = deleteUser.bind(null, id);

    return (
        <form action={deleteUserById} className={styles.form}>
            <button
                type="submit"
                className={styles.buttonDelete}
            >
                <Image
                    src={DeleteIcon}
                    alt="Delete Icon"
                    className={styles.icons}
                />
            </button>
        </form>
    );
}