import { FaGithub } from 'react-icons/fa';

import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__social-links">
          <p>
            <a
              href="https://github.com/eduardocasati/arquivo-pandeliga"
              target="_blank"
              rel="noopener noreferrer"
            >
              Código-fonte no GitHub <FaGithub />
            </a>
          </p>
        </div>
        <div className="footer__joke">
          {/* <p>Criado na força do mais puro ódio dos meus jogadores</p> */}
          <p>
            Construído entre derrotas inexplicáveis e decisões equivocadas que
            pareciam boas no momento.
          </p>
          {/* opção: substituir "inexplicáveis" por "injustas" */}
          {/* <p>Feito com React, suor, e escolhas de escalação questionáveis.</p> */}
          {/* <p>Baseado em algoritmos, estatísticas e... palpites místicos/questionáveis de domingo de manhã/em manhãs de domingo.</p> */}
        </div>
      </div>
    </footer>
  );
};
