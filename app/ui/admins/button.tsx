import Link from "next/link";
import Image from "next/image";
import styles from "@/public/styles/button.module.css";
import CreateIcon from "@/public/icons/create.png";
import EditIcon from "@/public/icons/edit.png";
import DeleteIcon from "@/public/icons/delete.png";
import { deleteAdmin } from "@/app/lib/actions";

export function CreateAdmin() {
    return (
        <Link href="/dashboard/admin/create" className={styles.nodecoration}>
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

export function UpdateAdmin({ id }: { id: string}) {
    return (
        <Link href={`/dashboard/admin/${id}/edit`} passHref>
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

export function DeleteAdmin({ id }: { id: string}) {
    const deleteAdminById = deleteAdmin.bind(null, id);

    return (
        <form action={deleteAdminById} className={styles.form}>
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
    )
}