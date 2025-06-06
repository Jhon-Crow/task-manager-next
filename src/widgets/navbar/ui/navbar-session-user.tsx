import {UserAvatar} from "@/entities/user";
import {SignOutButton} from "@/entities/auth";
import {Session} from "next-auth";

export const NavbarSessionUser = ({session}: {session: Session }) => {
    return (
        <div className="flex items-center">
            <UserAvatar
                user={{
                    ...session.user,
                    lastname: session.user.lastname || null,
                    imageUrl: session.user.image || null,
                }}
            />
            <span className="ml-2 text-xs">
                {session.user.lastname
                ? session.user.firstname + ' ' + session.user.lastname
                : session.user.firstname}
            </span>
            <SignOutButton />
        </div>
    );
};