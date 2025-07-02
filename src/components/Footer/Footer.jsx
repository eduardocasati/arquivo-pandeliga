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
          <p>
            Construído entre derrotas inexplicáveis e decisões equivocadas que
            pareciam boas no momento.
          </p>
        </div>
      </div>
    </footer>
  );
};
