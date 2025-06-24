import { Header } from '../../components/Header/Header';

import './HeadToHead.css';

export const HeadToHead = () => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <form>
          <label htmlFor="">
            Time 1:
            <select name="" id="">
              <option value="" disabled>
                Escolha um time
              </option>
              <option value="">Rohan Riders</option>
              <option value="">Beholders</option>
              <option value="">Spirit Breakers</option>
              <option value="">Ijuí Faceiros</option>
            </select>
          </label>
          <label htmlFor="">
            Time 2:
            <select name="" id="">
              <option value="" disabled>
                Escolha um time
              </option>
              <option value="">Rohan Riders</option>
              <option value="">Beholders</option>
              <option value="">Spirit Breakers</option>
              <option value="">Ijuí Faceiros</option>
            </select>
          </label>
        </form>
      </div>
    </>
  );
};
