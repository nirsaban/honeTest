import { NavBar } from '../components/navBar';

type Props = {
  children: any;
};

export const BaseLayout = (props: Props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};
