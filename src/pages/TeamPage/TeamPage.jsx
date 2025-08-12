import { Header } from '../../components';
import { Route } from '../../routes/$teamId';

import './TeamPage.css';

export const TeamPage = () => {
  const { teamId } = Route.useLoaderData();

  return (
    <>
      <Header />
      <div>
        <h1>Time: {teamId}</h1>
        <h1>funcionando</h1>
      </div>
    </>
  );
};
