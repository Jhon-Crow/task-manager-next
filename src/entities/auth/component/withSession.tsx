import { Session } from "next-auth";
import { ComponentType } from "react";
import { checkAuth } from "../model/service/checkAuth/checkAuth";

type WithSessionProps = {
  session: Session;
};

export const withServer = <P extends WithSessionProps>(
  WrapparedComponent: ComponentType<P & WithSessionProps>
): ComponentType<Omit<P, keyof WithSessionProps>> => {
  return async function WithSessionWrapper(props: Omit<P, "session">) {
    const session = await checkAuth();
    return <WrapparedComponent {...(props as P)} session={session} />;
  };
};
